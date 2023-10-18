package com.cp.praha.work.smsconfig.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_WORK_SMS_CONFIG_MGR_SELECT")
public class SmsConfigController {
    @GetMapping("/sms-config")
    public String smsListPage(){
        return "work/smsConfig";
    }
}
