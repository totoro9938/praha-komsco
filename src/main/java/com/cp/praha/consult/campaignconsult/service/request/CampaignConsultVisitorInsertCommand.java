package com.cp.praha.consult.campaignconsult.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignConsultVisitorInsertCommand {
    @NotNull(message = "캠페인아이디는 필수입니다.")
    @Min(value = 1, message = "캠페인아이디는 1이상 이어야 합니다.")
    private Integer campaignId;
    @NotNull(message = "캠페인아이디는 필수입니다.")
    @Min(value = 0, message = "대상자 아이디는 1이상 이어야 합니다.")
    private Integer campaignCustId;
    @NotBlank(message = "전화번호는 필수입니다.")
    private String boundTelNo;
}
