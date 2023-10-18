package com.cp.praha.consult.consultmain.service.response;

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
public class SmsTemplateSelectDomain {
    private String companyCd;
    @Id
    private int    smsTemplateId;
    private String smsTemplateUuid;
    private int    smsTemplateIdx;
    private String smsTemplateNm;
    private int    smsTemplateCatId;
    private String smsTemplateCatNm;
    private String smsTemplateContents;
    private int    contentsLen;
    private int    readCnt;
    private int    sendCnt;
    private String description;
    private String useYn;
    private String delYn;
    private int    rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private int    mdfrId;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
    private String mdfYmd;

}
