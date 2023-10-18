package com.cp.praha.work.campaign.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class CampaignCustSelectPageDomain {
    private Integer campaignId;
    @Id
    private Integer campaignCustId;
    private Integer boundId;
    private Integer callId;
    private Integer custId;
    private String custNm;
    private String boundTelNo;
    private String telNo;
    private String hpNo;
    private String campaignCustStatus;
    private String campaignCustStatusNm;
    private String result;
    private String resultMessage;
    private Integer userId;
    private String userNm;
    private String distributionYn;
    private ZonedDateTime distributionDt;
    private String satisfaction;
    private String satisfactionNm;
    private String boundDt;
    private Integer doneCnt;
    private String recallPossibilityYn;
}
