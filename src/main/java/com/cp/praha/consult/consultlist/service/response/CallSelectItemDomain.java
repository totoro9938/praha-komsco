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
public class CallSelectItemDomain {
    private String companyCd;
    private int    boundId;
    @Id
    private int    callId;
    private String callUuid;
    private String topCallUuid;
    private String parentCallUuid;
    private String boundType;
    private String boundTypeNm;
    private String callDivide;
    private String callDivideNm;
    private String callClass;
    private String callClassNm;
    private int    callCatId;
    private String fullCallCatNm;
    private int    custId;
    private String custNm;
    private String telYn;
    private String custTelNo;
    private String custHpNo;
    private String custType;
    private String custTypeNm;
    private String boundTelNo;
    private ZonedDateTime callDt;
    private String callYmd;
    private String callSs;
    private ZonedDateTime closeCallDt;
    private String closeCallYmd;
    private String closeCallSs;
    private String closeCallTm;
    private int    deptId;
    private String deptNm;
    private String fullDeptNm;
    private int    chargeId;
    private String chargeNm;
    private String    transferDeptId;
    private String transferDeptNm;
    private String transferFullDeptNm;
    private int    transferId;
    private String transferNm;
    private String transferMemo;
    private ZonedDateTime transferDt;
    private String transferYmd;
    private String processYn;
    private int    processId;
    private String processNm;
    private String processDeptId;
    private String processDeptNm;
    private String processFullDeptNm;
    private ZonedDateTime processDt;
    private String processYmd;
    private String processSs;
    private String question;
    private String answer;
    private String memo;
    private String description;
    private String keywords;
    private String callStatus;
    private String callStatusNm;
    private String callType;
    private String callTypeNm;
    private String telNo;
    private String hpNo;
    private String empUserId;
    private String recordingId;
    private String ctiStation;
    private String downYn;
    private String callCatNm;
    private String callCatPath;
    private int    reservationBoundId;
    private int    callbackId;
    private int    smsId;
    private int    reservationCallId;
    private int    rgtrId;
    private String rgtrNm;
    private int    rgtrDeptId;
    private String ctiId;
    private ZonedDateTime regDt;
    private String regYmd;
    private int    mdfrId;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
    private String result;
    private ZonedDateTime reservationDt;
    private String reservationTelNo;
    private String reservationMemo;
    private String reseravtionChargeId;
    private String reservationChargeNm;
    private String reservationStatus;
    private String reservationStatusNm;
    private Character adminYn;
}
