package com.cp.praha.main.common.service;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.main.common.entity.CtiCallbackInserProc;
import com.cp.praha.main.common.service.request.CtiCallbackCommand;
import com.cp.praha.main.common.service.response.CtiReportDomain;
import com.cp.praha.main.common.service.response.CtiWaitDomain;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CtiService {
    @Value("${company.name}")
    private String companyName;
    @Value("${internal.ip}")
    private String internalIp;
    private final RestTemplate restTemplate;

    private final EntityManager entityManager;

    @Transactional
    public Integer CallBackSave(CtiCallbackCommand command) {
        var procedure = CtiCallbackInserProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return (Integer) procedure.getOutputParameterValue("O_CALLBACK_ID");
    }

    public CtiWaitDomain getWait(){
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<?> entity = new HttpEntity<>(httpHeaders);
        try {
            var result = restTemplate
                    .exchange(String.format("%s/callrabi/wait", internalIp), HttpMethod.GET, entity,
                            Object.class);
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.convertValue(result.getBody(), CtiWaitDomain.class);
        }catch (Exception e){
            return new CtiWaitDomain();
        }
    }

    public CtiReportDomain getReport(String ctiId){
        HttpHeaders httpHeaders = new HttpHeaders();
        HttpEntity<?> entity = new HttpEntity<>(httpHeaders);
        try {
            var result = restTemplate
                    .exchange(String.format("%s/callrabi/report/%s", internalIp, ctiId), HttpMethod.GET, entity,
                            Object.class);
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.convertValue(result.getBody(), CtiReportDomain.class);
        }catch (Exception e){
            return new CtiReportDomain();
        }
    }
}
