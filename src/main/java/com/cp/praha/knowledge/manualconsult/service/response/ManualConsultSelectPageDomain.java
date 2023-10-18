package com.cp.praha.knowledge.manualconsult.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class ManualConsultSelectPageDomain {
    @Id
    private Integer manualId;
    private String manualUuid;
    private String parentUuid;
    private String importance;
    private String importanceNm;
    private Integer deptId;
    private String deptNm;
    private String fullDeptNm;
    private Integer chargeId;
    private String chargeNm;
    private Integer callCatId;
    private String callCatNm;
    private String title;
    private String contents;
    private String html;
    private String useYn;
    private Integer manualQnaCnt;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}
