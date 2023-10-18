package com.cp.praha.base.failure.service.response;

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
public class SystemFailureSelectDomain {
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
    private ZonedDateTime outbreakDt;
    private String outbreakYmd;
    private ZonedDateTime arriveDt;
    private ZonedDateTime startDt;
    private ZonedDateTime endDt;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private Integer mdfrId;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
    private String mdfYmd;

}
