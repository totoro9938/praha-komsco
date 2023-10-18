package com.cp.praha.work.callback.web;

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
@Secured("ROLE_WORK_CALLBACK_MGR_SELECT")
public class CallbackController {

    @GetMapping("/callback-manager")
    public String smsListPage(){
        return "work/callbackManager";
    }
}
