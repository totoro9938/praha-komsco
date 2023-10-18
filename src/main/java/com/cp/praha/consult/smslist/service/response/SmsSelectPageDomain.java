package com.cp.praha.consult.smslist.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class SmsSelectPageDomain {
    @Id
    private Integer no;
    private String companyCd;
    private Integer smsGroupId;
    private Integer smsId;
    private String smsUuid;
    private Integer custId;
    private String custNm;
    private Integer smsTemplateId;
    private ZonedDateTime regDt;
    private String toTelNo;
    private String smsType;
    private String smsTypeNm;
    private String smsTypeId;
    private String smsKind;
    private String smsKindNm;
    private String message;
    private String result;
    private String resultNm;
    private String rgtrNm;
    private String fromTelNo;
    private String sendDt;

}
