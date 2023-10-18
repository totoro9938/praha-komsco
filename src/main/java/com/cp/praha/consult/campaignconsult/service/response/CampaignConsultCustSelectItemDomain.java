package com.cp.praha.consult.campaignconsult.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class CampaignConsultCustSelectItemDomain {
    @Id
    private Integer campaignId;
    private Integer campaignCustId;
    private Integer callId;
    private Integer boundId;
    private ZonedDateTime callDt;
    private String callClass;
    private String callClassNm;
    private Integer callCatId;
    private String fullCallCatNm;
    private String question;
    private String answer;
    private String memo;
    private String boundType;
    private String boundTypeNm;
    private String callType;
    private String callTypeNm;
}
