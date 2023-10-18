package com.cp.praha.main.common.web;

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
@Secured("ROLE_ADMIN")
public class FileController {

    @RequestMapping("/common/upload")
    public String home(HttpSession session, Model model) {
        return "common/upload";
    }
}
