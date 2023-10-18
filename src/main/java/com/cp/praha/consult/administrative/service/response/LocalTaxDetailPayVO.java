package com.cp.praha.consult.administrative.service.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocalTaxDetailPayVO {
    @JsonProperty("cSlfOrg")
    private String cSlfOrg;
    @JsonProperty("cSlfOrgNm")
    private String cSlfOrgNm;
    private String cnSemok;
    private String ymGwase;
    private String dvGoji;
    @JsonProperty("sGwase")
    private String sGwase;
    @JsonProperty("dBankSunap")
    private String dBankSunap;
    private String tprNo;
    private String cnEmp;
    private String cnSunap;
    private int sunapTotAmt;
    private int sunapBonAmt;
    private int sunapGasanAmt;
    private String cnBank;
    private String cnGwaseObj;
    @JsonProperty("vGwase")
    private String vGwase;
    @JsonProperty("cDong")
    private String cDong;
    @JsonProperty("sEsunap")
    private String sEsunap;
    @JsonProperty("cSunapIn")
    private String cSunapIn;
    @JsonProperty("dComSoin")
    private String dComSoin;
    @JsonProperty("dComGubun")
    private String dComGubun;
    @JsonProperty("vSunapPrgs")
    private String vSunapPrgs;
    @JsonProperty("dDateReg")
    private String dDateReg;
    private String chk;
    private String sumChk;
}
