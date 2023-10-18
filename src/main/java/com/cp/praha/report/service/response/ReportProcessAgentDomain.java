package com.cp.praha.report.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
@ToString
public class ReportProcessAgentDomain {

    @Id
    private String userNm;
    private String deptCenterNm;
    private String cnt_1;
    private String cnt_2;
    private String cnt_3;
    private String cnt_4;
    private String cnt_5;
    private String cnt_6;
    private String cnt_7;
    private String cnt_8;
    private String cnt_9;
    private String cnt_10;

}

