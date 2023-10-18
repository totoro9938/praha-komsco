package com.cp.praha.consult.reservation.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class ReservationSelectPageDomain {

    private String companyCd;
    private Integer boundId;
    @Id
    private Integer callId;
    private Integer custId;
    private String custNm;
    private Integer chargeId;
    private String chargeNm;
    private String memo;
    private String reservationStatus;
    private String reservationStatusNm;
    private Integer processBoundId;
    private Integer processCallId;
    private String callClassNm;
    private String question;
    private String answer;
    private String callRgtrNm;
    private Integer callRgtrId;
    private ZonedDateTime callRegDt;
    private String reservationTelNo;
    private ZonedDateTime reservationDt;
    private String processYn;
    private Integer processId;
    private String processNm;
    private ZonedDateTime processDt;
    private String boundTelNo;
    private String boundYn;
    private ZonedDateTime boundDt;
    private Integer boundCnt;
    private String description;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;

}
