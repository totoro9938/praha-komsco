package com.cp.praha.main.common.service;

import com.cp.praha.common.domain.ApiErrorResponse;
import com.cp.praha.main.common.entity.AlarmSrcId;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebSocketService {
    @Value("${websocket.url}")
    private String url;
    private final RestTemplate restTemplate;

    public void alarmSourceSend(AlarmSrcId srcId1, String srcId2){
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<?> entity = new HttpEntity<>(httpHeaders);
        try {
            log.debug(String.format("%s/send/source/%s/%s",url,srcId1,srcId2));
           restTemplate
                    .exchange(String.format("%s/send/source/%s/%s",url,srcId1,srcId2), HttpMethod.GET, entity,
                            String.class);
        } catch (HttpClientErrorException e) {
            throw new ApiErrorResponse(e.getStatusCode(), e.getResponseBodyAsString());
        }
    }

}
