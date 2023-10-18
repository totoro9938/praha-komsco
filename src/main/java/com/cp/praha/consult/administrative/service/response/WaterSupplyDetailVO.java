package com.cp.praha.consult.administrative.service.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WaterSupplyDetailVO {
    private String chk;
    private String ichecodeNm;
    private String gojikindNm;
    private String gojimon;
    private String nabgidate;

    @JsonProperty("sNabgum")
    private int sNabgum;

    @JsonProperty("hNabgum")
    private int hNabgum;

    @JsonProperty("jNabgum")
    private int jNabgum;

    @JsonProperty("wNabgum")
    private int wNabgum;

    @JsonProperty("aBnabgum")
    private int aBnabgum;

    private int gasanNabgum;
    private int totNabgum;
    private String sunabdate;
    private String ocrcodeNm;
    private String supname;
    private String sguname;
    private String sgagusu;
    private String snowused;
    private String sjojungqty;
    private String snowchim;
    private String sbefchim;
    private String hupname;
    private String hasuqty;
    private String hgamqty;
    private String hjojungqty;
    private String jupname;
    private String jgagusu;
    private String jnowused;
    private String nowchulsu;
    private String jgamqty;
    private String jjojungqty;
    private String jnowchim;
    private String jbefchim;
    private String wupname;
    private String wnowused;
    private String wgamqty;
    private String wjojungqty;
    private String usedate1;
    private String usedate2;
    private String nabbugubun;
    private String epayno;
    private String esuyno;
    private String gojicode;
    private String accountNo;
}
