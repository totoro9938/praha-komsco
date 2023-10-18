package com.cp.praha.work.smstemaplate.web;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_WORK_SMS_TEMPLATE_MGR_SELECT")
public class SmsTemplateController {

    @GetMapping("/sms-template")
    public String smsListPage(){
        return "work/smsTemplate";
    }
}
