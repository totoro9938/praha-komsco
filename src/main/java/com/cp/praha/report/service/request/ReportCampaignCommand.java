package com.cp.praha.report.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ReportCampaignCommand {
    private String startDate;
    private String endDate;
    private String campaignType;
    private String sortType;
}
