package com.cp.praha.report.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class DiscomfortReportDayDomain {
    @Id
    private int no;
    private String companyCd;
    private String deptNm1;
    private String deptNm2;
    private String deptNm3;
    private String workNm;
    private int cnt;
    private int todayCnt;
    private String todayPer;
    @Column(name = "DAY_CNT_1")
    private int dayCnt1;
    @Column(name = "DAY_PER_1")
    private String dayPer1;
    @Column(name = "DAY_CNT_2")
    private int dayCnt2;
    @Column(name = "DAY_PER_2")
    private String dayPer2;
    @Column(name = "DAY_CNT_3")
    private int dayCnt3;
    @Column(name = "DAY_PER_3")
    private String dayPer3;
    @Column(name = "DAY_CNT_4")
    private int dayCnt4;
    @Column(name = "DAY_PER_4")
    private String dayPer4;
    @Column(name = "DAY_CNT_5")
    private int dayCnt5;
    @Column(name = "DAY_PER_5")
    private String dayPer5;
    @Column(name = "DAY_CNT_6")
    private int dayCnt6;
    @Column(name = "DAY_PER_6")
    private String dayPer6;
    @Column(name = "DAY_CNT_7")
    private int dayCnt7;
    @Column(name = "DAY_PER_7")
    private String dayPer7;
    @Column(name = "DAY_CNT_8")
    private int dayCnt8;
    @Column(name = "DAY_PER_8")
    private String dayPer8;
    @Column(name = "DAY_CNT_11")
    private int dayCnt11;
    @Column(name = "DAY_PER_11")
    private String dayPer11;
    @Column(name = "DAY_CNT_16")
    private int dayCnt16;
    @Column(name = "DAY_PER_16")
    private String dayPer16;
}
