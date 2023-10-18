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
public class TransferSelectItemDomain {
    private String        companyCd;
    private int           boundId;
    private int           callId;
    private int           custId;
    private int           unitedCustId;
    private String        custNm;
    private String        boundTelNo;
    private int           callCatId;
    private String        callCatNm;
    private String        fullCallCatNm;
    @Id
    private int           transferId;
    private String        transferUuid;
    private ZonedDateTime transferDt;
    private String        transferYmd;
    private String        processYn;
    private int           processId;
    private String        processNm;
    private String        processDeptNm;
    private String        processFullDeptNm;
    private ZonedDateTime processDt;
    private String        question;
    private String        memo;
    private String        answer;
    private String        transferMemo;
    private String        transferAnswer;
    private int           chargeId;
    private String        chargeNm;
    private int           deptId;
    private String        deptNm;
    private String        fullDeptNm;
    private String        transferStatus;
    private String        transferStatusNm;
    private String        transferEditYn;
    private String        custType;
    private String        custTypeNm;
    private String        telNo;
    private String        hpNo;
}
