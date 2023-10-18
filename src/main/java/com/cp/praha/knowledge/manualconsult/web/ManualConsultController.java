package com.cp.praha.knowledge.manualconsult.web;

import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_CONSULT_MANUAL_LIST_SELECT")
public class ManualConsultController {

    private final UserInfo userInfo;

    @RequestMapping("/manual-consult")
    public String manualConsult(Model model){
        model.addAttribute("userInfo",userInfo.getUser());
        return "knowledge/manual-consult";
    }

    @RequestMapping("/manual-location")
    public String manualLocation(){
        return "knowledge/location";
    }

    @RequestMapping("/manual-event")
    public String manualEvent(){ return "knowledge/event"; }

    @RequestMapping("/manual-script")
    public String manualScript(){ return "knowledge/script";}

    @RequestMapping("/manual-callclass")
    public String manualCallClass(){ return "knowledge/callClass";}

    @RequestMapping("/manual-expectation")
    public String manualExpectation(){ return "knowledge/expectation";}

    @RequestMapping("/manual-area-view")
    public String manualAreaView(){ return "knowledge/area-view";}
}
