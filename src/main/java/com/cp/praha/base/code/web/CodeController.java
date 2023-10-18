package com.cp.praha.base.code.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_BASE_CODE_MGR_SELECT")
public class CodeController {

    @RequestMapping("/codeMgr")
    public String codeManager() {
        return "base/code";
    }
}
