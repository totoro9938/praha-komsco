package com.cp.praha.work.discomfort.web;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
@Secured("ROLE_WORK_DISCOMFORT_LIST_SELECT")
public class DiscomfortController {

    @GetMapping("/discomfort-list")
    public String discomfort(){return "work/discomfort";}
}
