package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoundInsertCommand {
    private String ctiCallId;
    private String uui;
    private String ctiStation;
    private String recordingId;
    private String boundTelNo;
    private String dnis;
    private String boundType;
//    private String callType;
    private int campaignId;
    private int campaignCustId;
    private int reservationBoundId;
    private int reservationCallId;
    private int callbackId;
    private String connId;
}
