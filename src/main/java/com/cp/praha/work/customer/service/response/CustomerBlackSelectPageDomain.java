package com.cp.praha.work.customer.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class CustomerBlackSelectPageDomain {

    private Integer no;
    private String companyCd;
    @Id
    private Integer custBlackId;
    private Integer custId;
    private String custUuid;
    private String custNm;
    private Integer unitedCustId;
    private String boundTelNo;
    private String telNo;
    private String hpNo;
    private Integer boundId;
    private Integer callId;
    private String custType;
    private String custTypeNm;
    private Integer requesterId;
    private String requesterNm;
    private String processStatus;
    private String processStatusNm;
    private Integer processId;
    private String processYn;
    private ZonedDateTime processDt;
    private String processYmd;
    private String delYn;
    private Integer rgtrId;
    private ZonedDateTime regDt;
    private String regYmd;
    private Integer mdfrId;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}
