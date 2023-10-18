package com.cp.praha.work.survey.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_WORK_SURVAY_TEMPLATE_SELECT")
public class SurveyController {
    @GetMapping("/survey")
    public String smsListPage(){
        return "work/survey";
    }
}
