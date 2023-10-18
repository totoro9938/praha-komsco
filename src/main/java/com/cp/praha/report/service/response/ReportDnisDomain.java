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
public class ReportDnisDomain {
    private String regYmd;
    private int itemIdx;
    @Id
    private int no;
    private String sumCnt;
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
    private String cnt_11;
    private String cnt_12;
    private String cnt_13;
    private String cnt_14;
    private String cnt_15;
    private String cnt_16;
    private String cnt_17;
    private String cnt_18;
    private String cnt_19;
    private String cnt_20;

}
