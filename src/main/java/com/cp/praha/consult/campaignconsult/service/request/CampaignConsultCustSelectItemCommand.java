package com.cp.praha.consult.campaignconsult.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignConsultCustSelectItemCommand {
    @NotNull(message = "캠페인아이디는 필수입니다.")
    @Min(value = 1, message = "캠페인아이디는 1이상이어야 합니다.")
    private Integer campaignId;
    @NotNull(message = "campaignCustId 값은 필수입니다.")
    @Min(value = 0, message = "campaignCustId 값은 1이상이어야 합니다.")
    private Integer campaignCustId;
}
