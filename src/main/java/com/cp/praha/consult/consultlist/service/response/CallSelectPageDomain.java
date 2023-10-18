package com.cp.praha.consult.consultlist.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
@Entity
public class CallSelectPageDomain {
    private String companyCd;
    private int    boundId;
    @Id
    private int    callId;
    private String callUuid;
    private String topCallUuid;
    private String parentCallUuid;
    private String boundType;
    private String boundTypeNm;
    private String callClass;
    private String callClassNm;
    private int    callCatId;
    private String fullCallCatNm;
    private int    custId;
    private String custNm;
    private String boundTelNo;
    private ZonedDateTime callDt;
    private String callTm;
    private String closeCallTm;
    private int    deptId;
    private String deptNm;
    private String fullDeptNm;
    private int    chargeId;
    private String chargeNm;
    private int    processId;
    private String processNm;
    private ZonedDateTime processDt;
    private String question;
    private String answer;
    private String keywords;
    private String callStatus;
    private String callStatusNm;
    private String callType;
    private String callTypeNm;
    private int    rgtrId;
    private String rgtrNm;
    private String recordingId;
    private String telNo;
    private String hpNo;
}
