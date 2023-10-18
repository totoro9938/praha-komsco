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
public class ReportHourPerReceiptDomain {
    @Id
    private int no;
    private int    deptId;
    private String deptNm;
    private int    rgtrId;
    private String userNm;
    private String callYmd;
    private int T_08;
    private int T_09;
    private int T_10;
    private int T_11;
    private int T_12;
    private int T_13;
    private int T_14;
    private int T_15;
    private int T_16;
    private int T_17;
    private int T_18;
    private int T_19;
    private int totalCnt;
}
