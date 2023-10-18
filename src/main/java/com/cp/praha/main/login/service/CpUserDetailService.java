package com.cp.praha.main.login.service;

import com.cp.praha.common.domain.ApiErrorResponse;
import com.cp.praha.common.login.service.response.CpUserDetail;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.IpUtil;
import com.cp.praha.main.login.entity.LogLogoutInsProc;
import com.cp.praha.main.login.entity.UserLoginProc;
import com.cp.praha.main.login.entity.UserUptSecretProc;
import com.cp.praha.main.login.service.request.LogLogoutInsCommand;
import com.cp.praha.main.login.service.request.UserLoginCommand;
import com.cp.praha.main.login.service.request.UserUptSecretCommand;
import com.cp.praha.main.login.service.response.OtpResponse;
import com.cp.praha.main.mail.service.MailMessage;
import com.cp.praha.main.mail.service.MailService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import com.warrenstrange.googleauth.GoogleAuthenticatorQRGenerator;
import com.warrenstrange.googleauth.IGoogleAuthenticator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
public class CpUserDetailService implements UserDetailsService {
    private final EntityManager entityManager;
    private final UserLoginService userLoginService;
    private final MailService mailService;
    private final IGoogleAuthenticator googleAuthenticator = new GoogleAuthenticator();
    @Value("${otp.issuer}")
    private String ISSUER;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        HttpServletRequest request =
                ((ServletRequestAttributes) Objects.requireNonNull(RequestContextHolder.getRequestAttributes())).getRequest();
        String password = request.getParameter("userPwd");
        int authNumber = Integer.parseInt(request.getParameter("auth-number"));
        UserLoginCommand command = new UserLoginCommand();
        command.setUserCd(username);
        command.setUserPwd(password);
        command.setIp(IpUtil.getClientIP(request));
        command.setAuthNumber(authNumber);
        CpUserDetail userDetail = userLoginService.userLogin(command)
                .orElseThrow(() -> usernameNotFoundException("not found m_id = " + username));

        userDetail.setConnectIp(IpUtil.getClientIP(request));
        return userDetail;
    }

    private UsernameNotFoundException usernameNotFoundException(String message) {
        log.warn(message);
        return new UsernameNotFoundException(message);
    }

    @Transactional
    public void logout( LogLogoutInsCommand command) {
        LogLogoutInsProc.procedureQuery(entityManager,command);
    }

    public OtpResponse userOtpCheck(UserLoginCommand command) {

        var procedureQuery = UserLoginProc.procedureQuery(entityManager, command);

        var result = (String) procedureQuery.getOutputParameterValue("O_ERR_CD");
        var msg = (String) procedureQuery.getOutputParameterValue("O_ERR_MSG");
        log.debug("result - {},{}", result,msg);
        CpUserDetail c =  GenericListType.getObjectType(new TypeReference<>() {
        }, procedureQuery.getSingleResult());

        if (!result.equals("0")) {
            throw new ApiErrorResponse(HttpStatus.BAD_REQUEST,msg);
        }
        GoogleAuthenticatorKey secretKey = generateSecretKey();
        //this.userUptSecret(c);
        String qrCodeUrl = GoogleAuthenticatorQRGenerator.getOtpAuthURL(ISSUER, c.getUsername(), secretKey);
        return OtpResponse.builder()
                .userId(c.getUserId())
                .userCd(c.getUserCd())
                .qrCodeUrl(qrCodeUrl)
                .secretKey((c.getSecretKey() == null || c.getSecretKey().isEmpty()) ? secretKey.getKey():c.getSecretKey())
                .isOtpUse(c.getOtpUSeYn().equals("Y"))
                .isSave((c.getSecretKey() == null || c.getSecretKey().isEmpty()))
                .build();
    }

    public void userUptSecret(UserUptSecretCommand command) {

        UserUptSecretProc.procedureQuery(entityManager, command);
    }
    public void userUptSecret(CpUserDetail userDetail){
        GoogleAuthenticatorKey secretKey = generateSecretKey();
        UserUptSecretCommand command = new UserUptSecretCommand();
        command.setSecretKey(secretKey.getKey());
        command.setUserId(userDetail.getUserId());
        UserUptSecretProc.procedureQuery(entityManager, command);

        log.debug("userDetail - {}",userDetail.toString());

        String qrCodeUrl = GoogleAuthenticatorQRGenerator.getOtpAuthURL(ISSUER, userDetail.getUsername(), secretKey);
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("qrCodeUrl", qrCodeUrl);

        MailMessage mailMessage = MailMessage.builder()
                .templateName(MailMessage.OTP_REGISTRATION)
                .to(new String[]{userDetail.getEmail()})
                .subject("한국 조폐공사 상담시스템 OTP 등록")
                .attributes(attributes)
                .build();
        mailService.send(mailMessage);
    }

    public GoogleAuthenticatorKey generateSecretKey() {
        return googleAuthenticator.createCredentials();
    }
}
