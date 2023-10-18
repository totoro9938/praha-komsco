package com.cp.praha.consult.campaignconsult.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CampaignConsultSumSelectPageCommand {
    private String startDate;
    private String endDate;
    private String campaignStatus;
    private String campaignNm;
    @NotNull(message = "부서아이디가 존재해야 합니다.")
    @Min(value = 0, message = "부서아이디는 0 이상이어야 합니다.")
    private Integer parentId;
    @NotNull(message = "부서아이디가 존재해야 합니다.")
    @Min(value = 0, message = "부서아이디는 0 이상이어야 합니다.")
    private Integer deptId;
    @NotNull(message = "유저아이디가 존재해야 합니다.")
    @Min(value = 0, message = "유저아이디는 0 이상이어야 합니다.")
    private Integer userId;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;
}
