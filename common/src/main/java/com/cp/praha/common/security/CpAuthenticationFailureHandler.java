package com.cp.praha.common.security;

import com.cp.praha.common.exception.OtpException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicReference;

@Slf4j
@Component
public class CpAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    public static final String AUTH_PAGE = "/auth";
    public static final String AUTH_PASSWORD_UPDATE_PAGE = "/auth/password";
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        String errorMessage = null;
        String errPage = AUTH_PAGE;
        String otpYn = "N";
        if (exception instanceof DisabledException) {
            errorMessage = "계정이 비활성화 되었습니다. 관리자에게 문의하세요.";
        } else if (exception instanceof BadCredentialsException) {
            errorMessage = exception.getMessage();
        } else if (exception instanceof InternalAuthenticationServiceException) {
            errorMessage = exception.getMessage();
        }else if (exception instanceof CredentialsExpiredException) {
            errorMessage = exception.getMessage();
            errPage = AUTH_PASSWORD_UPDATE_PAGE;
        } else if (exception instanceof SessionAuthenticationException) {
            errorMessage = "동일계정이 접속중입니다. 기존계정을 로그아웃하세요.";
        } else {
            errorMessage = "로그인 싪패하엿습니다.";
        }
        if (exception instanceof OtpException) {
            log.debug("OtpException : {}",exception.getMessage());
            otpYn = "Y";
            errorMessage = exception.getMessage();
        }

        String userCd = request.getParameter("userCd");
        String userPwd = request.getParameter("userPwd");
        log.debug("error - {} - {}", errorMessage, userCd);
        request.setAttribute("error", errorMessage);
        request.setAttribute("userCd", userCd);
        request.setAttribute("otpYn", otpYn);
        request.setAttribute("userPwd", userPwd);
        log.debug("{}", request.getAttribute("userCd"));

        AtomicReference<String> defaultFailureUrl = new AtomicReference<>(errPage);
        request.getRequestDispatcher(defaultFailureUrl.get()).forward(request, response);
    }
}
