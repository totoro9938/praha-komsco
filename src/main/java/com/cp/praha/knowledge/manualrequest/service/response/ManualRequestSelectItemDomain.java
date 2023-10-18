package com.cp.praha.knowledge.manualrequest.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class ManualRequestSelectItemDomain {

    private String companyCd;
    @Id
    private Integer requestManualId;
    private Integer manualId;
    private String manualUuid;
    private String title;
    private String fullCatNm;
    private Integer deptId;
    private String deptNm;
    private String fullDeptNm;
    private Integer chargeId;
    private String chargeNm;
    private String requestReasonType;
    private String requestReasonTypeNm;
    private String requestReason;
    private String rejectReason;
    private String requestManualStatus;
    private String requestManualStatusNm;
    private String approvalYn;
    private Integer processId;
    private String processNm;
    private ZonedDateTime processDt;
    private String processYmd;
    private Integer readCnt;
    private Integer readPerCnt;
    private String delYn;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private Integer mdfrId;
    private String  mdfrNm;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
    private String manualDelYn;
}
