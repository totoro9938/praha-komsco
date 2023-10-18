package com.cp.praha.work.campaign.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class CampaignSelectPageDomain {
    private String companyCd;
    @Id
    private Integer campaignId;
    private String campaignUuid;
    private String campaignNm;
    private String campaignType;
    private String campaignTypeNm;
    private String startYmd;
    private String endYmd;
    private String useYn;
    private String campaignStatus;
    private String campaignStatusNm;
}
