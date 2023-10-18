package com.cp.praha.knowledge.manualrelation.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_WORK_RELATE_MANUAL_MGR_SELECT")
public class ManualRelationController {

    @RequestMapping("/manual-relation")
    public String manualRelation(){
        return "knowledge/manual-relation";
    }
}
