package com.cp.praha.consult.smsconsult.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_CONSULT_SMS_CONSULT_SELECT")
public class SmsConsultController {
    @RequestMapping("/sms-consult")
    public String consultMain(HttpSession session, Model model) {
        return "consult/smsConsult";
    }
}
