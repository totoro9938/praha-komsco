package com.cp.praha.work.shortcut.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_WORK_SHORT_MGR_SELECT")
public class ShortCutMgrController {
    @GetMapping("/shortcut-manager")
    public String warnCustomer(){
        return "work/shortcut-manager";
    }
}
