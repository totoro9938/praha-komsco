package com.cp.praha.consult.consultlist.web;

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
@Secured("ROLE_CONSULT_CONSULT_LIST_SELECT")
public class ConsultListController {
    @RequestMapping("/consultList")
    public String consultMain(HttpSession session, Model model) {
        return "consult/consultList";
    }
}
