package com.cp.praha.consult.campaignconsult.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignConsultCustUpdateCommand {
    @NotNull(message = "캠페인아이디는 필수입니다.")
    @Min(value = 1, message = "캠페인아이디 값은 1이상이어야 합니다.")
    private Integer campaignId;
    @NotNull(message = "캠페인 대상 아이디는 필수입니다.")
    @Min(value = 1, message = "캠페인 대상 아이디 값은 1이상이어야 합니다.")
    private Integer campaignCustId;
    @NotNull(message = "바운드아이디는 필수입니다.")
    @Min(value = 0, message = "바운드아이디 값은 0이상이어야 합니다.")
    private Integer boundId;
    @NotNull(message = "콜아이디는 필수입니다.")
    @Min(value = 0, message = "콜아이디 값은 0이상이어야 합니다.")
    private Integer callId;
    private String campaignCustStatus;
    private String satisfaction;
    private String description;
}
