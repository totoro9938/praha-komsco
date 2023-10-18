package com.cp.praha.base.logInfo.web;

import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@Controller
@Valid
public class LogInfoController {
    private final UserInfo userInfo;

    @GetMapping("/log-info")
    public String logInfo(){
        return "base/logInfo";
    }
}
