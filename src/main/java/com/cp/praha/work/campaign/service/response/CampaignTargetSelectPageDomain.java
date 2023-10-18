package com.cp.praha.work.campaign.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class CampaignTargetSelectPageDomain {
    private String companyCd;
    private Integer boundId;
    @Id
    private Integer callId;
    private String callUuid;
    private ZonedDateTime callDt;
    private Integer custId;
    private String custNm;
    private String custTypeNm;
    private String boundTypeNm;
    private String boundTelNo;
    private String hpNo;
    private String telNo;
    private String callClassNm;
    private String fullCallCatNm;
    private String callTypeNm;
}
