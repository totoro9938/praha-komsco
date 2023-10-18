package com.cp.praha.report.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
@ToString
public class ReportBoundTypeDomain {
    private int itemIdx;
    @Id
    private String no;
    @Column(name = "ITEM_NM1")
    private String itemNm1;
    @Column(name = "ITEM_NM2")
    private String itemNm2;
    private String sumCnt;
    private String cnt_1;
    private String rate_1;
    private String cnt_2;
    private String rate_2;
    private String cnt_3;
    private String rate_3;
    private String cnt_4;
    private String rate_4;
    private String cnt_5;
    private String rate_5;
    private String cnt_6;
    private String rate_6;
    private String cnt_7;
    private String rate_7;
    private String cnt_8;
    private String rate_8;
    private String cnt_9;
    private String rate_9;
    private String cnt_10;
    private String rate_10;
    private String cnt_11;
    private String rate_11;
    private String cnt_12;
    private String rate_12;
    private String cnt_13;
    private String rate_13;
    private String cnt_14;
    private String rate_14;
    private String cnt_15;
    private String rate_15;
    private String cnt_16;
    private String rate_16;
    private String cnt_17;
    private String rate_17;
    private String cnt_18;
    private String rate_18;
    private String cnt_19;
    private String rate_19;
    private String cnt_20;
    private String rate_20;
}
