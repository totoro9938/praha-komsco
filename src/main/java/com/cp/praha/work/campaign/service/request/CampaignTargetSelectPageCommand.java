package com.cp.praha.work.campaign.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignTargetSelectPageCommand {
    @NotNull(message = "캠페인아이디는 필수입니다.")
    @Min(value = 1, message = "캠페인아이디 값은 1이상이어야 합니다.")
    private Integer campaignId;
    @NotBlank(message = "캠페인유형은 필수입니다.")
    private String campaignType;
    private String startDate;
    private String endDate;
    private String custType;
    private String callClass;
    private Integer callCatId;
    private String callType;
    private String boundType;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;
}
