package com.cp.praha.work.campaign.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignUpdateCommand {
    @NotNull(message = "캠페인아이디는 필수입니다.")
    @Min(value = 1, message = "캠페인아이디 값은 1이상이어야 합니다.")
    private Integer campaignId;
    @NotBlank(message = "캠페인명은 필수입니다.")
    private String campaignNm;
    @NotBlank(message = "캠페인유형은 필수입니다.")
    private String campaignType;
    private String campaignStatus;
    private String startDate;
    private String endDate;
    private String description;
    private String useYn;
    private String delYn;
    private Integer mdfrId;
}
