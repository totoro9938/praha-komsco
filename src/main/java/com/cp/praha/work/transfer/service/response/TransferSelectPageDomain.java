package com.cp.praha.work.transfer.service.response;

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
public class TransferSelectPageDomain {
    private String        companyCd;
    private int           boundId;
    private int           callId;
    private int           custId;
    private String        custNm;
    private int           unitedCustId;
    @Id
    private int           transferId;
    private String        transferUuid;
    private ZonedDateTime transferDt;
    private String        transferYmd;
    private String        boundTelNo;
    private int           callCatId;
    private String        callCatNm;
    private String        fullCallCatNm;
    private String        transferStatus;
    private String        transferStatusNm;
    private int           rgtrId;
    private String        rgtrNm;
    private int           deptId;
    private String        deptNm;
    private String        fullDeptNm;
    private int           chargeId;
    private String        chargeNm;
    private ZonedDateTime processDt;
    private String        question;
}
