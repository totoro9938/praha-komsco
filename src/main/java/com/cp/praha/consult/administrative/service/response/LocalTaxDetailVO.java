package com.cp.praha.consult.administrative.service.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocalTaxDetailVO {
    private String chk;
    private String sumChk;
    private String tprNo;
    @JsonProperty("nTelCellular")
    private String nTelCellular;
    private String vtAcct;
    @JsonProperty("cSlfOrg")
    private String cSlfOrg;
    @JsonProperty("cSlfOrgNm")
    private String cSlfOrgNm;
    private String dvGoji;
    private String cnSemok;
    @JsonProperty("dBugwa")
    private String dBugwa;
    @JsonProperty("dChgDue")
    private String dChgDue;
    @JsonProperty("dChgDueGbn")
    private String dChgDueGbn;
    private String taJan;
    private String lstAmt;
    private String lstAddAmt;
    private String totAmt;
    private String attGbn;
    private String cnEmp;
    @JsonProperty("sEsunap")
    private String sEsunap;
    private String virAcc;
    private String virAcc2;
    private String virAcc3;
    private String virAcc4;
    private String virAcc5;
    @JsonProperty("xXcl")
    private String xXcl;
    @JsonProperty("dBankSunap")
    private String dBankSunap;
    @JsonProperty("vSunapPrgs")
    private String vSunapPrgs;
    private String lssGbn;
    private String ymGwase;
    @JsonProperty("sGwase")
    private String sGwase;
    private String cnSunap;
    private String sunapTotAmt;
    private String sunapBonAmt;
    private String sunapGasanAmt;
    private String cnBank;
    private String cnGwaseObj;
    @JsonProperty("vGwase")
    private String vGwase;
    @JsonProperty("cDong")
    private String cDong;
    @JsonProperty("cSunapIn")
    private String cSunapIn;
    @JsonProperty("dComSoin")
    private String dComSoin;
    @JsonProperty("dComGubun")
    private String dComGubun;
    private String autoAccYn;
    private String electInfoYn;
    @JsonProperty("dDateReg")
    private String dDateReg;
}
