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
public class ReportCallbackProcessTimeDomain {
    @Id
    private String regYmd;
    private Integer cnt_sum;
    private Integer cnt_1;
    private Integer cnt_2;
    private Integer cnt_3;
    private Integer cnt_4;
    private Integer cnt_5;
    private Integer cnt_6;
    private Integer cnt_7;
    private Integer cnt_not;

}
