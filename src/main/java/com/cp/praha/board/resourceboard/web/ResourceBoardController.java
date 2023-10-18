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
@Secured("ROLE_BOARD_RESOURCE_ROOM_SELECT")
public class ResourceBoardController {

    private final UserInfo userInfo;

    @RequestMapping("/resource-board")
    public String resourceBoard(Model model){
        model.addAttribute("idName", "resource-board");
        return "board/resourceboard/resource-board";
    }

    @RequestMapping("/resource-board-editor")
    public String resourceBoardEditor(Model model) {
        model.addAttribute("idName", "resource-board");
        model.addAttribute("userInfo",userInfo.getUser());
        return "board/resourceboard/resource-board-editor";
    }

    @RequestMapping("/resource-board-detail")
    public String resourceBoardDetail(Model model) {
        model.addAttribute("idName", "resource-board");
        model.addAttribute("userInfo",userInfo.getUser());
        return "board/resourceboard/resource-board-detail";
    }
}
