package com.cp.praha.consult.smslist.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class SmsSelectItemDomain {
    private Integer smsGroupId;
    @Id
    private Integer smsId;
    private String smsUuid;
    private String sendDt;
    private String deliveryDt;
    private String phoneNumber;
    private String message;
    private ZonedDateTime regDt;
    private String userNm;
    private String telNo;
    private String smsKind;
    private String smsKindNm;
    private String smsType;
    private String smsTypeNm;
    private String result;
    private String resultNm;
    private String resultDetail;
    private String reSendYn;
    private Integer reSendCnt;
    private String srcId01;
    private String srcId02;
    private String srcId03;
    private String oriSendDt;
    private String oriPhoneNumber;
}
