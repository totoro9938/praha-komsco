package com.cp.praha.base.failure.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@Entity
public class SystemFailureSelectItemDomain {
    @Id
    private Integer systemFailureId;
    private String systemFailureUuid;
    private String systemFailureType;
    private String systemFailureTypeNm;
    private String systemFailureWorkCd;
    private String systemFailureWorkNm;
    private String systemFailureContents;
    private String systemFailureAction;
    private String systemFailureWorker;
    private Integer confirmId;
    private String confirmNm;
    private ZonedDateTime confirmDt;
    private String confirmYmd;
    private String outbreakDt;
    private String outbreakYmd;
    private String outbreakTime;
    private String arriveDt;
    private String startDt;
    private String endDt;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private Integer mdfrId;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}
