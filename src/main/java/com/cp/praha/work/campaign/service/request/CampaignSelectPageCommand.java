package com.cp.praha.work.campaign.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CampaignSelectPageCommand {
    private String startDate;
    private String endDate;
    private String campaignStatus;
    private String campaignType;
    private String campaignNm;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;

}
