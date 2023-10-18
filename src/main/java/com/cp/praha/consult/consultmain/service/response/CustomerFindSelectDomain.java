package com.cp.praha.consult.consultmain.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class CustomerFindSelectDomain {
    private String  no;
    private String  companyCd;
    private Integer custId;
    @Id
    private String  custUuid;
    private String  custNm;
    private String  telNo;
    private String  hpNo;
    private String  boundTelNo;
    private String  custType;
    private String  custTypeNm;
    private String  lastCallDt;
    private Integer unitedCustId;
    private Integer unitedCustCnt;
    private String  smsYn;
    private String  telYn;
    private String description;
}
