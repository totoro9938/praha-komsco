package com.cp.praha.knowledge.manualscript.web;

import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@Secured("ROLE_WORK_SCRIPT_MGR_SELECT")
public class ManualScriptController {

    private final UserInfo userInfo;

    @RequestMapping("/script-manager")
    @Secured("ROLE_WORK_SCRIPT_MGR_SELECT")
    public String scriptManager() {
        return "knowledge/script-manager";
    }
}
