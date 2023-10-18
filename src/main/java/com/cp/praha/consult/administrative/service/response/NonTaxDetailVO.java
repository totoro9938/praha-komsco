package com.cp.praha.consult.administrative.service.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NonTaxDetailVO {
    private String depNm;
    private String siteNm;
    private String accYear;
    private String semokNm;
    private String divSno;
    private String payGbn;
    private String attGbn;
    private String perGbn;
    private String perPid;
    private String perNm;
    private String perPost;
    private String perAddr;
    private String sperTel;
    private String perCell;
    private String lvyGbn;
    private String lvyYmd;
    private String fstNapYmd;
    private String lstNapYmd;
    private String aftNapYmd;
    private String aftNapAmt;
    private String fstAmt;
    private String lvySttGbn;
    private String lstAmt;
    private String lstAddAmt;
    private String divIja;
    private String divGbn;
    private String thapGbn;
    private String objNm;
    private String objAddr;
    private String bankNm;
    private String ercNo;
    private String mngHtm1;
    private String mngHtm2;
    private String mngHtm3;
    private String mngHtm4;
    private String mngHtm5;
    private String mngHtm6;
    @JsonProperty("dlSayuNm")
    private String dlSayuNm;
    private String perEmail;
    private String autoTrnrSp;
    private String gamGbn;
    private String totAmt;
    private String accountNo;
    private String accountNo2;
    private String accountNo3;
    private String accountNo4;
    private String accountNo5;
    private String accountNo6;
    private String accountNo7;
    private String sumChk;
    private String chk;
    private String lsGbn;
}
