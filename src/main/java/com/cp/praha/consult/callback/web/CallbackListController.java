package com.cp.praha.consult.callback.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@Controller
@Valid
@Secured("ROLE_CONSULT_CALLBACK_LIST_SELECT")
public class CallbackListController {

    @GetMapping("/callback")
    public String smsListPage(){
        return "consult/callback";
    }
}
