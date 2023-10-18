package com.cp.praha.board.freeboard.web;


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
@Secured("ROLE_BOARD_FREE_SELECT")
public class FreeBoardController {

    private final UserInfo userInfo;

    @RequestMapping("/free-board")
    public String freeBoard(){
        return "board/free-board";
    }

    @RequestMapping("/free-board-editor")
    public String freeBoardEditor(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "board/free-board-editor";
    }

    @RequestMapping("/free-board-detail")
    public String freeBoardDetail(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "board/free-board-detail";
    }
}
