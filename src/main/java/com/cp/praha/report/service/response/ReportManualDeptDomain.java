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
public class ReportManualDeptDomain {
    @Id
    private String no;
    private String deptNm;
    private String callCatNm;
    private String cntSum;
    private String cnt_1;
    private String cnt_2;
    private String cnt_3;
    private String cnt_4;

}
