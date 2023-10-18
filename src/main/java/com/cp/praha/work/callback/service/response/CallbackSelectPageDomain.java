package com.cp.praha.work.callback.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class CallbackSelectPageDomain {
    private String        companyCd;
    @Id
    private int           callbackId;
    private String        callbackUuid;
    private ZonedDateTime callbackDt;
    private String        inboundTelNo;
    private String        callbackTelNo;
    private String        custType;
    private int           overlapCnt;
    private String        route;
    private String        callbackStatus;
    private String        callbackStatusNm;
    private int           boundCnt;
    private ZonedDateTime boundDt;
    private ZonedDateTime distributionDt;
    private int           custId;
    private String        custNm;
    private int           userId;
    private String        userNm;
    private int           processId;
    private String        processNm;
    private String        processYn;
    private ZonedDateTime processDt;
    private ZonedDateTime regDt;
    private String        recallYn;

}
