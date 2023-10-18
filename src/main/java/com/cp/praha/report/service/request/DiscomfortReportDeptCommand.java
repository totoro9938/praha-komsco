package com.cp.praha.report.service.request;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class DiscomfortReportDeptCommand {
    private String startDate;
    private String endDate;
    private String processOffice;
    private String discomfortWorkType;
    private String processCat;
    private String outputYn;
    private String sortType;

}
