package com.cp.praha.websocket.message.web;

import com.cp.praha.websocket.message.service.WebSocketService;
import com.cp.praha.websocket.message.service.response.AlarmSrcId;
import com.cp.praha.websocket.message.service.response.MessageType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class WebSocketRestController {

    private final WebSocketService webSocketService;


    @GetMapping(value = "/send/all/{message}", produces = "application/json; charset=utf8")
    public void sendToAllUser(@PathVariable(value = "message") String message) {
        webSocketService.sendToAllUser(message);
    }

    @GetMapping(value = "/send/{users}/{job}", produces = "application/json; charset=utf8")
    public void sendToJob(@PathVariable(value = "users") String users,@PathVariable(value = "job") MessageType job) {
        webSocketService.sendToUser(users,job);
    }

    @GetMapping(value = "/send/source/{srcId1}/{srcId2}", produces = "application/json; charset=utf8")
    public void alarmSrcId(@PathVariable(value = "srcId1") AlarmSrcId srcId1, @PathVariable(value = "srcId2") String srcId2) {
        webSocketService.alarmSourceSend(srcId1,srcId2);
    }
}
