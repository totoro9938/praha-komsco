package com.cp.praha.knowledge.manualworker.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class ManualWorkerSelectDomain {
    @Id
    private Integer manualWorkerId;
    private String manualWorkerUuid;
    private Integer manualId;
    private String workerNm;
    private String workerTelNo;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private Integer mdfrId;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}
