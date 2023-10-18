package com.cp.praha.report.service.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReportManualDeptCommand {

    private String deptType;
    private String startDate;
    private String endDate;

}