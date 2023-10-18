package com.cp.praha.consult.campaignconsult.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_CONSULT_HAPPYCALL_LIST_SELECT")
public class CampaignConsultController {

    @RequestMapping("/campaign-consult")
    public String campaignConsult(){
        return "consult/campaignConsult";
    }
}
