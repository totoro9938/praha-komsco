package com.cp.praha.websocket.message.service;

import com.cp.praha.websocket.config.SocketSessionRegistry;
import com.cp.praha.websocket.message.entity.AlarmRepository;
import com.cp.praha.websocket.message.service.response.AlarmSrcId;
import com.cp.praha.websocket.message.service.response.MessageType;
import com.cp.praha.websocket.message.service.response.OutMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketService {

    private final AlarmRepository alarmRepository;
    private final ObjectMapper objectMapper;
    private final SocketSessionRegistry webAgentSessionRegistry;

    private final SimpMessagingTemplate template;


    public void sendToAllUser(String message){
        List<String> keys = getKeys();

        try {
            var sendMsg = objectMapper.writeValueAsString(OutMessage.builder().type(MessageType.ALARM).message(message).build());
            keys.forEach(x -> {

                var sessionIds = webAgentSessionRegistry.getSessionIds(x);
                sessionIds.forEach(sessionId -> {
                    log.info("sendToAllUser:"+sessionId);
                    template.convertAndSendToUser(sessionId, "/topic/all-message",
                            sendMsg, createHeaders(sessionId));
                });

            });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void sendToUser(String users ,MessageType messageType){
        List<String> keys = getKeys();
        String[] userList  = users.split(",");

        try {
            var sendMsg = objectMapper.writeValueAsString(OutMessage.builder().type(messageType).message("").build());
            Arrays.stream(userList).forEach(user->{
                keys.stream().filter(user::equals).forEach(x -> {
                    var sessionIds = webAgentSessionRegistry.getSessionIds(x);
                    sessionIds.forEach(sessionId -> {
                        log.info("sendToUser:"+sessionId);
                        template.convertAndSendToUser(sessionId, "/topic/job",
                                sendMsg, createHeaders(sessionId));
                    });

                });
            });

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void alarmSourceSend(AlarmSrcId srcId1, String srcId2){
        var date = ZonedDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        log.info("alarmSourceSend date - {}",date);
        var domain = alarmRepository.findBySrcId1AndSrcId2AndMdfYmd(srcId1.getValue(),srcId2,date);

        domain.forEach(d->{
            try {
                var str = objectMapper.writeValueAsString(d);
                log.info("alarmSourceSend str - {}",str);
                log.info("alarmSourceSend getUserId - {}", d.getUserId());
                this.sendTopicAlarm(String.valueOf(d.getUserId()),str);
            } catch (JsonProcessingException e) {
                log.error(e.getMessage());
            }
        });
    }

    public void sendTopicAlarm(String userId,String body){
        List<String> keys = getKeys();

        keys.stream().filter(userId::equals).forEach(x -> {

            var sessionIds = webAgentSessionRegistry.getSessionIds(x);
            sessionIds.forEach(sessionId -> {
                log.info(sessionId);
                template.convertAndSendToUser(sessionId, "/topic/alarm",
                        OutMessage.builder().type(MessageType.ALARM_CENTER).message(body).build(), createHeaders(sessionId));
            });

        });
    }



    public List<String> getKeys(){
        return new ArrayList<>(webAgentSessionRegistry.getAllSessionIds().keySet());
    }

    private MessageHeaders createHeaders(String sessionId) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);
        return headerAccessor.getMessageHeaders();
    }
}
