package com.cp.praha.work.campaign.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@Controller
@Valid
@Secured("ROLE_WORK_HAPPYCALL_MGR_SELECT")
public class CampaignController {


    @GetMapping("/campaign")
    public String smsListPage(){
        return "work/campaign";
    }

}
