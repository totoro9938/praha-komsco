package com.cp.praha.consult.campaignconsult.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignConsultCustCallSelectPageCommand {
    @NotNull(message = "campaignId 값은 필수입니다.")
    @Min(value = 1, message = "campaignId 값은 1이상이어야 합니다.")
    private Integer campaignId;
    private String campaignCustStatus;
    @NotNull(message = "부서아이디가 존재해야 합니다.")
    @Min(value = 0, message = "부서아이디는 0 이상이어야 합니다.")
    private Integer parentId;
    @NotNull(message = "부서아이디가 존재해야 합니다.")
    @Min(value = 0, message = "부서아이디는 0 이상이어야 합니다.")
    private Integer deptId;
    @NotNull(message = "유저아이디가 존재해야 합니다.")
    @Min(value = 0, message = "유저아이디는 0 이상이어야 합니다.")
    private Integer userId;
    private Integer page;
    private Integer totalPage;
}
