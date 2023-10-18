package com.cp.praha.work.smsconfig.service.response;

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
public class SmsSpamTelNoSelectItemDomain {
    private String        companyCd;
    @Id
    private String        spamUuid;
    private String        spamTelNo;
    private ZonedDateTime firstSpamDt;
    private ZonedDateTime lastSpamDt;
    private int           spamCnt;
    private int           smsRvId;
    private String        message;
    private String        useYn;
    private String        useYnNm;
    private String        delYn;
    private String        description;
    private int           rgtrId;
    private String        userNm;
    private ZonedDateTime regDt;
    private String        regYmd;
    private int           mdfrId;
    private ZonedDateTime mdfDt;
    private String        mdfYmd;
}
