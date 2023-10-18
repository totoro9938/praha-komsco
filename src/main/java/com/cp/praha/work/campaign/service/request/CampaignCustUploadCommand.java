package com.cp.praha.work.campaign.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignCustUploadCommand {
    @NotNull(message = "캠페인아이디는 필수입니다.")
    @Min(value = 1, message = "캠페인아이디는 1이상이어야 합니다.")
    private Integer campaignId;
    private Integer saveCnt;
    private Integer uploadIdx;
    @NotBlank(message = "고객명은 필수입니다.")
    private String custNm;
    private String boundTelNo;
    private String telNo;
    private String hpNo;
    private Integer rgtrId;
    private String ip;
}
