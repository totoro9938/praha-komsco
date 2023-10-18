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
public class ReportTransferListDomain {
    @Id
    private int    no;
    private int    deptId;
    private String deptNm;
    private int    transferId;
    private String userNm;
    private int transferCnt;
    private int processingCnt;
    private String processCnt;
    private String processAvg;
    private String processMin;
    private String processMax;
}
