package com.cp.praha.consult.smslist.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@Controller
@Valid
public class SmsListController {

    @GetMapping("/sms-list")
    public String smsListPage(){
        return "consult/smsList";
    }
}
