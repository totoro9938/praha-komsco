package com.cp.praha.knowledge.manualmanager.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class ManualSelectItemDomain {
    private String companyCd;
    @Id
    private Integer manualId;
    private String manualUuid;
    private String manualType;
    private Integer parentId;
    private Integer callCatId;
    private String catNm;
    private String fullCatNm;
    private String importance;
    private String importanceNm;
    private String fontColor;
    private String title;
    private Integer deptId;
    private String deptNm;
    private String fullDeptNm;
    private Integer chargeId;
    private String chargeNm;
    private String telNo;
    private String html;
    private String contents;
    private Integer requestManualId;
    private String manualStatus;
    private String description;
    private Integer readCnt;
    private Integer readPerCnt;
    private Integer confirmCnt;
    private Integer confirmPerCnt;
    private Integer totReadCnt;
    private Integer totReadPerCnt;
    private Integer totConfirmCnt;
    private Integer totConfirmPerCnt;
    private Integer manualQnaCnt;
    private String startYmd;
    private String endYmd;
    private String useYn;
    private String inheritUseYn;
    private String validationYn;
    private String delYn;
    private String inheritDelYn;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private Integer mdfrId;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
    private String requestReasonTypeNm;
}
