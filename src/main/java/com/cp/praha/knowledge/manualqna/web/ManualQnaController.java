package com.cp.praha.knowledge.manualqna.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_WORK_QNA_MGR_SELECT")
public class ManualQnaController {

    @RequestMapping("/qna-manager")
    public String qnaManager(){
        return "knowledge/qna-manager";
    }
}
