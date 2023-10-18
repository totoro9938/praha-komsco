package com.cp.praha.consult.callback.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class CallbackSelectItemDomain {
    private String        companyCd;
    @Id
    private int           callbackId;
    private ZonedDateTime callbackDt;
    private String        inboundTelNo;
    private String        callbackTelNo;
    private String        hpNo;
    private int           overlapCnt;
    private int           custId;
    private String        custNm;
    private String        route;
    private String        routeNm;
    private ZonedDateTime boundDt;
    private int           boundCnt;
    private int           userId;
    private String        userNm;
    private int           processId;
    private String        processNm;
    private String        processYn;
    private int           processBoundId;
    private int           processCallId;
    private String        callType;
    private ZonedDateTime processDt;
    private String        callbackStatus;
    private String        callbackStatusNm;
    private String        description;
    private ZonedDateTime regDt;
    private ZonedDateTime distributionDt;
    private String        recallYn;
    private String        custType;
    private String        custTypeNm;
    private String        requestReason;
}
