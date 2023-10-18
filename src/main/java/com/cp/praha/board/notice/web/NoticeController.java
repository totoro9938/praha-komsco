package com.cp.praha.board.notice.web;

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
@Secured("ROLE_BOARD_NOTICE_SELECT")
public class NoticeController {

    private final UserInfo userInfo;

    @RequestMapping("/notice")
    public String notice(){
        return "board/notice";
    }

    @RequestMapping("/notice-editor")
    public String noticeEditor(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "board/notice-editor";
    }

    @RequestMapping("/notice-detail")
    public String noticeDetail(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "board/notice-detail";
    }
}
