package com.cp.praha.report.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReportRequestManualListCommand {
    private int    parentId;
    private int    deptId;
    private String startDate;
    private String endDate;
}
