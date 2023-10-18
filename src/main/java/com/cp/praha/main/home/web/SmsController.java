package com.cp.praha.main.home.web;

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
public class SmsController {
    @RequestMapping("/sms-send")
    public String smsSend(Model model){
        return "main/sms-send";
    }

}
