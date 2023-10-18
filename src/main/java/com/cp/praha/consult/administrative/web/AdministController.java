package com.cp.praha.consult.administrative.web;

import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@Controller
@Valid
@Secured("ROLE_CONSULT_ADMINIST_SELECT")
public class AdministController {

    private final UserInfo userInfo;

    @GetMapping("/administrative")
    public String administrativePage(Model model){
        model.addAttribute("userInfo",userInfo.getUser());
        return "consult/administrative";
    }

}
