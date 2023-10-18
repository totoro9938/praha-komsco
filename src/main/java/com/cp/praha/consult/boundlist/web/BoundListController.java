package com.cp.praha.consult.boundlist.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_CONSULT_BOUND_LIST_SELECT")
public class BoundListController {
    @RequestMapping("/boundList")
    public String boundList(HttpSession session, Model model) {
    return "consult/boundList";
  }
}
