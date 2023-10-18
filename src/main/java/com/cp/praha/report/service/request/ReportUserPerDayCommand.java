package com.cp.praha.report.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReportUserPerDayCommand {
    private String startDate;
    private String endDate;
    private int    parentId;
    private int    deptId;
    private int    userId;
    private String boundType;
    private String sortType;
}
