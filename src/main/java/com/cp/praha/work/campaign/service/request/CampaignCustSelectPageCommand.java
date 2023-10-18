package com.cp.praha.work.campaign.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignCustSelectPageCommand {
    @NotNull(message = "campaignId 값은 필수입니다.")
    @Min(value = 1, message = "campaignId 값은 1이상이어야 합니다.")
    private Integer campaignId;
    private String campaignCustStatus;
    private String smsResult;
    private int parentId;
    private int deptId;
    private Integer userId;
    private String searchType;
    private String searchTxt;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;
}
