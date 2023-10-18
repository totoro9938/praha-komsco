package com.cp.praha.common.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class CpAccessDeniedHandler implements AccessDeniedHandler {

    private static final String ACCESS_DENIED_PAGE="/access-denied";

    @Override
    public void handle(HttpServletRequest httpServletRequest,
                       HttpServletResponse httpServletResponse,
                       AccessDeniedException e) throws IOException, ServletException {
        log.warn("access-denied");
        String deniedUrl = ACCESS_DENIED_PAGE + "?exception=" + e.getMessage();
        httpServletResponse.sendRedirect(deniedUrl);
    }
}
