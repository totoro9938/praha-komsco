package com.cp.praha.knowledge.manualmanager.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class ManualSelectPageDomain {
    private String companyCd;
    @Id
    private Integer manualId;
    private String manualUuid;
    private Integer deptId;
    private String deptNm;
    private String fullDeptNm;
    private Integer chargeId;
    private String chargeNm;
    private Integer callCatId;
    private String callCatNm;
    private String title;
    private String useYn;
    private Integer manualQnaCnt;
    private Integer manualRelationCnt;
    private ZonedDateTime regDt;
    private String regYmd;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}