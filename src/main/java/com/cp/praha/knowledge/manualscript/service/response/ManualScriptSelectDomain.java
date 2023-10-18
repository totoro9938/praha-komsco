package com.cp.praha.knowledge.manualscript.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class ManualScriptSelectDomain {

    private String companyCd;
    @Id
    private int scriptId;
    private String scriptUuid;
    private String scriptNm;
    private String koreaYn;
    private String nationalityCd;
    private String useYn;
    private int rgtrId;
    private String regDt;
    private String regYmd;
    private int mdfrId;
    private String mdfDt;
    private String mdfYmd;
}
