package com.cp.praha.work.campaign.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class CampaignUserDistribSelectDomain {
    @Id
    private Integer userId;
    private String userNm;
    private Integer devideCnt;
    private Integer nondoneCnt;
    private Integer doneCnt;
}
