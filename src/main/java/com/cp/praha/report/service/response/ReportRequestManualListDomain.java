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
public class ReportRequestManualListDomain {
    @Id
    private int no;
    private String sortPath;
    private String deptPath;
    private int    deptId;
    private String deptNm;
    private String fullDeptNm;
    private int    totCnt;
    private int    mdfCnt;
    private int    delCnt;
    private int    deptRegCnt;
    private int    deptMdfCnt;
    private int    deptDelCnt;
    private int    callRegCnt;
    private int    callMdfCnt;
    private int    callDelCnt;
}
