package com.cp.praha.knowledge.manualmanager.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class ManualHistorySelectDomain {
    @Id
    private ZonedDateTime regDt;
    private String rgtrNm;
    private String requestReason;
    private Integer manualId;
    private Integer manualIdx;
}
