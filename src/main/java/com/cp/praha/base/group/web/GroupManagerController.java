package com.cp.praha.base.group.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Slf4j
@Controller
@RequiredArgsConstructor
@Secured("ROLE_BASE_GROUP_MGR_SELECT")
public class GroupManagerController {

    @RequestMapping("/group-manager")
    public String groupManager(HttpSession session, Model model) {
        return "base/group";
    }
}
