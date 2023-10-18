package com.cp.praha.base.department.web;

import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@Controller
@Valid
@Secured("ROLE_BASE_DEPT_MGR_SELECT")
public class DepartmentController {
    private final UserInfo userInfo;

    @RequestMapping("/deptMgr")
    public String deptMgr(HttpSession session, Model model) {
        model.addAttribute("role",userInfo.getUserRole("ROLE_BASE_DEPT_MGR"));
        return "base/department";
    }

    @RequestMapping("/dept-editor")
    public String deptEditor(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "base/dept-editor";
    }

    @RequestMapping("/dept-detail")
    public String deptDetail(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "base/dept-detail";
    }



}