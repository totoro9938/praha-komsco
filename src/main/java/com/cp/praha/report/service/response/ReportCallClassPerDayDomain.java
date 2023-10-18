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
public class ReportCallClassPerDayDomain {
    @Id
    private int no;
    private String callClass;
    private String callClassNm;
    private int    callCatId;
    private String catPath;
    private int    catLvl;
    private String sortPath;
    private String catPath1;
    private String catPath2;
    private String catPath3;
    private int defaultCnt;
    private int reservationCnt;
    private int empTransferCnt;
    private int callTransferCnt;
    private int callTotalCnt;
    private int processCnt;
    private int transferCnt;
}
