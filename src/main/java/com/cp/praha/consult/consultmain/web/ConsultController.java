package com.cp.praha.consult.consultmain.web;

import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpSession;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_CONSULT_MAIN_SELECT")
public class ConsultController {

    private final UserInfo userInfo;

    @RequestMapping("/main")
    public String consultMain(HttpSession session, Model model) {
        return "consult/consult";
    }

    @RequestMapping("/transferList")
    public String transferList(Model model, @RequestParam(value="consult",defaultValue = "N") String consultYn ) {
        model.addAttribute("userInfo",userInfo.getUser());
        model.addAttribute("consultYn",consultYn);
        return "consult/transferList";
    }
}
