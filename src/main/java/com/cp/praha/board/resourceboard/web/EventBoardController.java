package com.cp.praha.board.resourceboard.web;


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
@Secured("ROLE_BOARD_EVENT_SELECT")
public class EventBoardController {

    private final UserInfo userInfo;

    @RequestMapping("/event-board")
    public String eventBoard(Model model){
        return "board/eventboard/event-board";
    }

    @RequestMapping("/event-board-editor")
    public String eventBoardEditor(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "board/eventboard/event-board-editor";
    }

    @RequestMapping("/event-board-detail")
    public String eventBoardDetail(Model model) {
        model.addAttribute("userInfo",userInfo.getUser());
        return "board/eventboard/event-board-detail";
    }
}
