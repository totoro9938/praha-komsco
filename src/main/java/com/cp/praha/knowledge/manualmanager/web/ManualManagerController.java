package com.cp.praha.knowledge.manualmanager.web;

import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
public class ManualManagerController {

    private final UserInfo userInfo;

    @RequestMapping("/request-manual")
    @Secured("ROLE_WORK_REQUEST_MANUAL_LIST_SELECT")
    public String requestManualList() {
        return "knowledge/request-manual";
    }

    @RequestMapping("/manual-editor")
    public String manualEditor(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "knowledge/manual-editor";
    }

    @RequestMapping("/manual-detail")
    public String manualDetail(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "knowledge/manual-detail";
    }

    @RequestMapping("/manual-history")
    public String manualHistory(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "knowledge/manual-history";
    }

    @RequestMapping("/manual-manager")
    public String manualManager() {
        return "knowledge/manual-manager";
    }
}
