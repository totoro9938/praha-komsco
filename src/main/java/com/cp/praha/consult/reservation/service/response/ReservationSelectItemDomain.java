package com.cp.praha.consult.reservation.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class ReservationSelectItemDomain {

    private String companyCd;
    private Integer boundId;
    @Id
    private Integer callId;
    private Integer custId;
    private Integer chargeId;
    private String chargeNm;
    private String deptNm;
    private String fullDeptNm;
    private String reservationTelNo;
    private ZonedDateTime reservationDt;
    private String custNm;
    private String custType;
    private String custTypeNm;
    private ZonedDateTime boundDt;
    private String boundYn;
    private Integer boundCnt;
    private String question;
    private String answer;
    private String memo;
    private String description;
    private String reservationStatus;
    private String reservationStatusNm;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private Integer mdfrId;
    private ZonedDateTime mdfDt;
    private ZonedDateTime callRegDt;
    private ZonedDateTime callDt;
    private Integer processId;
    private String processNm;
    private String processYn;
    private ZonedDateTime processDt;
    private Integer processBoundId;
    private Integer processCallId;
    private String boundTelNo;
    private Integer callCatId;
    private String callCatNm;
    private String fullCallCatNm;
    private String callClass;
    private String callClassNm;
    private String keywords;

}
