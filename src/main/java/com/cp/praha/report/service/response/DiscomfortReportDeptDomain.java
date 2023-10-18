package com.cp.praha.report.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class DiscomfortReportDeptDomain {
    @Id
    private int no;
    private String companyCd;
    private String deptNm1;
    private String deptNm2;
    private String deptNm3;
    private String workNm;
    private int cnt;
    private int receiptCnt;
    private String receiptPer;
    private int returnCnt;
    private String returnPer;
    private int distributeCnt;
    private String distributePer;
    private int delayCnt;
    private String delayPer;
    private int completeCnt;
    private String completePer;
    private int cancelCnt;
    private String cancelPer;
    private int distributeImpossibleCnt;
    private String distributeImpossiblePer;
    private int processImpossibleCnt;
    private String processImpossiblePer;
}
