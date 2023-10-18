package com.cp.praha.base.program.web;


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
public class ProgramController {
    private final UserInfo userInfo;

    /**
     *
     * @return
     */
    @GetMapping("/program")
    public String program(){
        return "base/program";
    }

}
