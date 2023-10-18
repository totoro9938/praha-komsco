package com.cp.praha.main.login.web;

import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
public class UserController {
    private final UserInfo userInfo;

    @RequestMapping("/auth")
    public String auth() {
        return "main/auth";
    }

    @RequestMapping("/auth/otp")
    public String otp() {
        return "main/otp";
    }

    @RequestMapping("/auth/password")
    public String password() {
        return "main/auth-password-update";
    }
    @RequestMapping("/")
    public String root() throws Exception{
        return "redirect:/auth";
    }
}
