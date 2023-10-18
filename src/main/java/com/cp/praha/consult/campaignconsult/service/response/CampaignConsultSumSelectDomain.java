package com.cp.praha.consult.campaignconsult.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class CampaignConsultSumSelectDomain {
    @Id
    private Integer campaignId;
    private String campaignUuid;
    private String campaignNm;
    private String startYmd;
    private String endYmd;
    private String useYn;
    private String campaignStatus;
    private String campaignStatusNm;
    private Integer totalCnt;
    private Integer processingCnt;
    private Integer noprocessingCnt;
    private Integer doneCnt;
    private Integer nodoneCnt;
}
