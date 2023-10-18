package com.cp.praha.consult.campaignconsult.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class CampaignConsultVisitorSelectDomain {
    @Id
    private Integer visitorId;
    private ZonedDateTime boundDt;
    private String boundTelNo;
    private String rgtrNm;

}
