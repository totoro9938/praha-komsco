package com.cp.praha.work.campaign.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignCustDeleteCommand {
    @NotNull(message = "캠페인 아이디는 필수입니다.")
    @Min(value = 1, message = "캠페인 아이디는 1이상이어야 합니다.")
    private Integer campaignId;
    @NotNull(message = "삭제할 고객아이디는 필수입니다.")
    @Min(value = 0, message = "삭제할 고객아이디는 0이상이어야 합니다.")
    private Integer campaignCustId;
    private Integer mdfrId;
}
