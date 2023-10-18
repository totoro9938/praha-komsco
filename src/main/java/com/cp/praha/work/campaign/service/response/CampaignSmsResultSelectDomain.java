package com.cp.praha.work.campaign.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class CampaignSmsResultSelectDomain {
    @Id
    private Integer totCnt;
    private Integer readyCnt;
    private Integer sucessCnt;
    private Integer sendReayCnt;
    private Integer failCnt;
}
