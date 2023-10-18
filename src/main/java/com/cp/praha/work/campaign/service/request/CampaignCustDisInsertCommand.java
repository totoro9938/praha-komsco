package com.cp.praha.work.campaign.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignCustDisInsertCommand {
    @NotNull(message = "캠페인아이디는 필수입니다.")
    @Min(value = 1, message = "캠페인아이디는 1 이상 이어야 합니다.")
    private Integer campaignId;
    private String userId;
    private String cnt;
    private Integer userCnt;
    private Integer rgtrId;
}
