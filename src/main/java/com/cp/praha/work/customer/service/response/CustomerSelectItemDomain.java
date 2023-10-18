package com.cp.praha.work.customer.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class CustomerSelectItemDomain {

    private String companyCd;
    @Id
    private Integer custId;
    private String custUuid;
    private String custNm;
    private String custNo;
    private String birthDay;
    private String gender;
    private String custType;
    private String custTypeNm;
    private String telNo;
    private String hpNo;
    private String boundTelNo;
    private Integer unitedCustId;
    private Integer unitedCustCnt;
    private String personInfoUseYn;
    private ZonedDateTime personInfoAgreeDt;
    private String personInfoAgreeYmd;
    private String email;
    private String emailYn;
    private ZonedDateTime emailAgreeDt;
    private String emailAgreeYmd;
    private String smsYn;
    private ZonedDateTime smsAgreeDt;
    private String smsAgreeYmd;
    private String telYn;
    private ZonedDateTime telAgreeDt;
    private String telAgreeYmd;
    private Integer firstBoundId;
    private Integer firstCallId;
    private ZonedDateTime firstCallDt;
    private String firstCallYmd;
    private Integer firstCallRgtrId;
    private Integer lastCallId;
    private ZonedDateTime lastCallDt;
    private String lastCallYmd;
    private Integer lastCallRgtrId;
    private String description;
    private String delYn;
    private Integer rgtrId;
    private ZonedDateTime regDt;
    private String regYmd;
    private Integer mdfrId;
    private ZonedDateTime mdfDt;
    private String mdfYmd;

}
