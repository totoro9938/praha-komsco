package com.cp.praha.knowledge.manualrequest.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class ManualRequestSelectPageDomain {

    private String companyCd;
    @Id
    private Integer requestManualId;
    private String requestReasonType;
    private String requestReasonTypeNm;
    private String requestReason;
    private Integer deptId;
    private String deptNm;
    private String fullDeptNm;
    private Integer chargeId;
    private String chargeNm;
    private String requestManualStatus;
    private String requestManualStatusNm;
    private String approvalYn;
    private Integer manualId;
    private String manualUuid;
    private Integer processId;
    private String processNm;
    private String processYn;
    private ZonedDateTime processDt;
    private String processYmd;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private ZonedDateTime mdfDt;

}
