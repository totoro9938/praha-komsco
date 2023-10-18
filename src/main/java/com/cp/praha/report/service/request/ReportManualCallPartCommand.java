package com.cp.praha.report.service.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReportManualCallPartCommand {

    private String startDate;
    private String endDate;
    private String searchType;

}