package com.cp.praha.knowledge.manualscript.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class ManualScriptItemSelectDomain {

    private int scriptId;
    private String companyCd;
    @Id
    private int scriptItemId;
    private String scriptItemUuid;
    private String scriptItemNm;
    private String scriptItemDesc;
    @Column(name = "SCRIPT_ITEM_DESC_T")
    private String scriptItemDescT;
    private String useYn;
    private String inheritUseYn;
    private int rgtrId;
    private String regDt;
    private String regYmd;
    private int mdfrId;
    private String mdfDt;
    private String mdfYmd;

}
