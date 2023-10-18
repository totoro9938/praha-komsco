package com.cp.praha.main.home.web;

import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@Controller
@Valid
@Secured("ROLE_ADMIN")
public class HomeController {

    private final UserInfo userInfo;

    @RequestMapping("/home")
    public String home(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "main/home";
    }

    @RequestMapping("/user-password")
    public String userPassword() {
        return "main/password";
    }

    @RequestMapping("/expired")
    public String expired(){
        return "common/expired";
    }

    @RequestMapping("/dashboard")
    public String dashboard(){
        return "main/dashboard";
    }
}
