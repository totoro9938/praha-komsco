package com.cp.praha.board.message.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_BOARD_MESSAGE_SELECT")
public class MessageController {

    @RequestMapping("/message")
    public String notice(){
        return "board/message";
    }
}
