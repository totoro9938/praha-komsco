package com.cp.praha.work.campaign.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class CampaignCustInsertCommand {
    @NotNull(message = "캠페인아이디는 필수입니다.")
    @Min(value = 1, message = "캠페인아이디 값은 1이상이어야 합니다.")
    private Integer campaignId;
    @NotNull(message = "바운드아이디는 필수입니다.")
    @Min(value = 0, message = "바운드아이디 값은 0이상이어야 합니다.")
    private Integer boundId;
    @NotNull(message = "콜아이디는 필수입니다.")
    @Min(value = 0, message = "콜아이디 값은 0이상이어야 합니다.")
    private Integer callId;
    private Integer rgtrId;
}
