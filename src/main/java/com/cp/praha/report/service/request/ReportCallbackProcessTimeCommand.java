package com.cp.praha.report.service.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ReportCallbackProcessTimeCommand {

    private String startDate;
    private String endDate;

}