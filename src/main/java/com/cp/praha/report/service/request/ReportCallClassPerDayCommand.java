package com.cp.praha.report.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReportCallClassPerDayCommand {
    private String startDate;
    private String endDate;
    private String callClass;
    private int    callCatId;
    private String sortType;
}
