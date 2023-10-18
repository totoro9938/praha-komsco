package com.cp.praha.consult.administrative.service;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.administrative.service.response.*;
import com.cp.praha.consult.smslist.entity.SmsInsertProc;
import com.cp.praha.consult.smslist.service.request.SmsInsertCommand;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class AdministService {

    private final AdministUtil administUtil;
    private final UserInfo userInfo;
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;

    /**
     * 상하수도 수용가 API
     */
    public List<WaterSupplyVO> getWaterSupply(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<WaterSupplyVO> waterSupplyVOList = Arrays.asList(objectMapper.readValue(jsonString, WaterSupplyVO[].class));

        return waterSupplyVOList;
    }

    /**
     * 상하수도 수용가 상세 API
     */
    public List<WaterSupplyDetailVO> getWaterSupplyDetail(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<WaterSupplyDetailVO> waterSupplyDetailVOList = Arrays.asList(objectMapper.readValue(jsonString, WaterSupplyDetailVO[].class));

        return waterSupplyDetailVOList;
    }



    /**
     * 환경개선부담금 미납 API
     */
    public List<EnvironmentVO> getEnvironmentNonPayment(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<EnvironmentVO> environmentVOList = Arrays.asList(objectMapper.readValue(jsonString, EnvironmentVO[].class));

        return environmentVOList;
    }

    /**
     * 환경개선부담금 납부 API
     */
    public List<EnvironmentVO> getEnvironmentPayment(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<EnvironmentVO> environmentVOList = Arrays.asList(objectMapper.readValue(jsonString, EnvironmentVO[].class));

        return environmentVOList;
    }



    /**
     * 지방세 고객정보 API
     */
    public List<LocalTaxVO> getLocalTax(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<LocalTaxVO> localTaxVOList = Arrays.asList(objectMapper.readValue(jsonString, LocalTaxVO[].class));

        return localTaxVOList;
    }

    /**
     * 지방세 상세 API
     */
    public List<LocalTaxDetailVO> getLocalTaxDetail(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<LocalTaxDetailVO> localTaxDetailVOList = Arrays.asList(objectMapper.readValue(jsonString, LocalTaxDetailVO[].class));

        return localTaxDetailVOList;
    }
    public List<LocalTaxDetailPayVO> getLocalTaxDetailPay(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<LocalTaxDetailPayVO> localTaxDetailPayVOList = Arrays.asList(objectMapper.readValue(jsonString, LocalTaxDetailPayVO[].class));

        return localTaxDetailPayVOList;
    }



    /**
     * 세외수입 고객정보 API
     */
    public List<NonTaxVO> getNonTax(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<NonTaxVO> nonTaxVOList = Arrays.asList(objectMapper.readValue(jsonString, NonTaxVO[].class));

        return nonTaxVOList;
    }
    /**
     * 세외수입 상세 API
     */
    public List<NonTaxDetailVO> getNonTaxDetail(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<NonTaxDetailVO> nonTaxDetailVOList = Arrays.asList(objectMapper.readValue(jsonString, NonTaxDetailVO[].class));

        return nonTaxDetailVOList;
    }
    public List<NonTaxDetailPayVO> getNonTaxDetailPay(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<NonTaxDetailPayVO> nonTaxDetailPayVOList = Arrays.asList(objectMapper.readValue(jsonString, NonTaxDetailPayVO[].class));

        return nonTaxDetailPayVOList;
    }



    /**
     * 교통유발 API
     */
    public List<TrafficVO> getTraffic(String jsonString) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); //VO에 없는 파라미터는 매핑X
        List<TrafficVO> trafficVOList = Arrays.asList(objectMapper.readValue(jsonString, TrafficVO[].class));

        return trafficVOList;
    }



    /**
     * SMS 전송
     */
    @Transactional
    public void administSmsInsert(SmsInsertCommand command) {
        ProcErrorHandler.errorHandler(SmsInsertProc.procedureQuery(entityManager,userInfo,command));
    }
}
