package com.cp.praha.consult.consultmain.service.request;

import com.cp.praha.work.customer.service.request.CustomerUpdateCommand;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ConusltCallInsertCommand {
    private int    boundId;
    private String ctiCallId;
    private String uui;
    private String ctiStation;
    private String recordingId;
    private String boundTelNo;
    private String dnis;
    private String connId;
    private String boundType;
    private int    custId;
    private String custNm;
    private String parentCallUuid;
    private String callClass;
    private int    deptId;
    private int    chargeId;
    private int    callCatId;
    private String callStartDt;
    private String callEndDt;
    private String question;
    private String answer;
    private String memo;
    private String callType;
    private int    reservationUserId;
    private String reservationTelNo;
    private String reservationDt;
    private String reservationMemo;
    private int    transferDeptId;
    private int    transferChargeId;
    private String transferMemo;
    private int    reservationBoundId;
    private int    transferCallId;
    private int    reservationCallId;
    private int    callbackId;
    private int    campaignId;
    private int    campaignCustId;
    private String callObResult;
    private CustomerUpdateCommand custCommand;
}
