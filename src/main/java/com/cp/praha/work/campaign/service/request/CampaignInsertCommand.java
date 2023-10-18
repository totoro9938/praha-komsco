package com.cp.praha.work.campaign.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class CampaignInsertCommand {
    private String campaignUuid;
    @NotBlank(message = "캠페인명은 필수입니다.")
    private String campaignNm;
    @NotBlank(message = "캠페인유형은 필수입니다.")
    private String campaignType;
    private String campaignStatus;
    private String startDate;
    private String endDate;
    private String description;
    private String useYn;
    private Integer questionId;
    private Integer rgtrId;
}
