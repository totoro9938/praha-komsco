package com.cp.praha.main.login.service;

import com.cp.praha.common.exception.OtpException;
import com.cp.praha.common.login.service.response.CpUserDetail;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.main.login.entity.UserAuthProc;
import com.cp.praha.main.login.entity.UserLoginProc;
import com.cp.praha.main.login.service.request.UserAuthCommand;
import com.cp.praha.main.login.service.request.UserLoginCommand;
import com.fasterxml.jackson.core.type.TypeReference;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.IGoogleAuthenticator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.servlet.http.HttpSession;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class UserLoginService {
    private final IGoogleAuthenticator googleAuthenticator = new GoogleAuthenticator();
    private final EntityManager entityManager;

    @Transactional(readOnly = true)
    public Optional<CpUserDetail> userLogin(UserLoginCommand command){

        var procedureQuery = UserLoginProc.procedureQuery(entityManager, command);
        var result = (String) procedureQuery.getOutputParameterValue("O_ERR_CD");
        var msg = (String) procedureQuery.getOutputParameterValue("O_ERR_MSG");
        log.debug("result - {},{}", result,msg);
        if (result.equals("0")) {

            CpUserDetail user =  GenericListType.getObjectType(new TypeReference<>() {
            }, procedureQuery.getSingleResult());

            log.debug("username - {} - {} - {}", user.getUserNm(),user.getSecretKey(),command.getAuthNumber());

            if(!otpAuthorize(user.getSecretKey(),command.getAuthNumber())){
                log.debug("인증번호 - {} - {} - {}", user.getUserNm(),user.getSecretKey(),command.getAuthNumber());
                throw otpException("OTP 번호 를 확인 하세요!");
            }
            return getUserDetail(GenericListType.getObjectType(new TypeReference<>() {
            }, procedureQuery.getSingleResult()));
        }else if (result.equals("-2")){
            CpUserDetail c = new CpUserDetail(command.getUserCd(),command.getUserPwd());
            c.setIsEnabled(false);
            return Optional.of(c);
        }
        throw new UsernameNotFoundException("not found m_id = " + command.getUserCd());
    }
    private OtpException otpException(String message) {
        log.warn(message);
        return new OtpException(message);
    }


    public Optional<CpUserDetail> getUserDetail(UserLoginProc user) {
        var userAuth = UserAuthProc.procedureQuery(entityManager, UserAuthCommand.builder()
                .userId(user.getUserId())
                .build());

        CpUserDetail cpUserDetail = new CpUserDetail(user.getUserCd(), user.getUserPwd());
        cpUserDetail.setUserCd(user.getUserCd());
        cpUserDetail.setUserId(user.getUserId());
        cpUserDetail.setUserUuid(user.getUserUuid());
        cpUserDetail.setUserNm(user.getUserNm());
        cpUserDetail.setLastLoginDt(user.getLastLoginDt());

        cpUserDetail.setDeptId(user.getDeptId());
        cpUserDetail.setDeptNm(user.getDeptNm());
        cpUserDetail.setGroupUid(user.getGroupUid());
        cpUserDetail.setCtiId(user.getCtiId());
        cpUserDetail.setCtiPwd(user.getCtiPwd());
        cpUserDetail.setCtiStation(user.getCtiStation());
        cpUserDetail.setCtiYn(user.getCtiYn());
        //cpUserDetail.setPwdChangeYn(user.getPwdChangeYn());
        var pwdChangeYn = user.getPwdChangeYn();
        if(pwdChangeYn.equals("N")||pwdChangeYn.equals("C")){
            cpUserDetail.setCredentialsNonExpire(false);
            var errMsg = user.getPwdChangeYn().equals("N") ?
                    "최초 로그인시 패스워드를 변경하여야 합니다.":"비밀번호 유효기간이 만료 되었습니다.";
            log.error("errMsg - {}",errMsg);
        }
        List<UserAuthProc> authRow = GenericListType.getObjectType(new TypeReference<>() {
        }, userAuth.getResultList());

        var roles = authRow.stream()
                .map(UserAuthProc::getGrantRoleNm)
                .collect(Collectors.joining(";"));

        Arrays.stream(roles.split(";"))
                .collect(Collectors.toList())
                .stream()
                .filter(o -> !o.isEmpty())
                .map(SimpleGrantedAuthority::new)
                .forEach(cpUserDetail::addAuthority);

        log.debug("{}", cpUserDetail.getAuthorities());

        return Optional.of(cpUserDetail);
    }

    public void logout(HttpSession session) {
        session.invalidate();

    }

    public boolean otpAuthorize(String userSecretKey,int verificationCode){
        return googleAuthenticator.authorize(userSecretKey, verificationCode);
    }
}
