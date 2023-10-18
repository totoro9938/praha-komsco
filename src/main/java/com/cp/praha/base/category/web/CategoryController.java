package com.cp.praha.base.category.web;

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
@Secured("ROLE_BASE_CAT_MGR_SELECT")
public class CategoryController {
    private final UserInfo userInfo;

    @RequestMapping("/catMgr")
    public String deptMgr(HttpSession session, Model model) {
        model.addAttribute("role",userInfo.getUserRole("ROLE_BASE_CAT_MGR"));
        return "base/category";
    }

}
