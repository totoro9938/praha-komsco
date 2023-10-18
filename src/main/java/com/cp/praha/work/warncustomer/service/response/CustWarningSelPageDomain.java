package com.cp.praha.work.warncustomer.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
@ToString
public class CustWarningSelPageDomain {
    @Id
    private int no;
    private int custWarningId;
    private int custId;
    private int unitedCustId;
    private String boundTelNo;
    private int boundId;
    private int callId;
    private String warningType;
    private String warningTypeNm;
    private int requesterId;
    private String requesterNm;
    private String requestReason;
    private String processStatus;
    private String processStatusNm;
    private int processId;
    private String processYn;
    private ZonedDateTime processDt;
    private String processYmd;
    private String startYmd;
    private String endYmd;
    private String delYn;
    private int rgtrId;
    private ZonedDateTime regDt;
    private String regYmd;
    private int mdfrId;
    private ZonedDateTime mdfDt;
    private String mdfYmd;

}
