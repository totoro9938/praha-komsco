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
public class ReportUserPerDayDomain {
    @Id
    private int    no;
    private String sortPath;
    private String deptPath;
    private int    deptId;
    private String deptNm;
    private String userId;
    private String userNm;
    private String regYmd;
    private int    defaultCnt;
    private int    reservationCnt;
    private int    empTransferCnt;
    private int    callTransferCnt;
    private int    callTotalCnt;
    private int    ibCnt;
    private int    obCnt;
    private int    boundCnt;
    private int    rvCnt;
    private int    callbackCnt;
    private int    campaignCnt;
    private int    questionCnt;
}
