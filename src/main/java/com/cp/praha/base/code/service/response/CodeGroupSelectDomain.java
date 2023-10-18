package com.cp.praha.base.code.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
@Entity
public class CodeGroupSelectDomain {
    private int    no;
    private String companyCd;
    @Id
    private String codeGroupCd;
    private String codeGroupNm;
    private String codeGroupIdx;
    private String codeNmTitle;
    private String codeKeyTitle;
    private String codeValueTitle_01;
    private String codeValueTitle_02;
    private String codeValueTitle_03;
    private String codeValueTitle_04;
    private String codeValueTitle_05;
    private int    maxAllowLvl;
    private String memoryManYn;
    private String sysYn;
    private String useYn;
    private String delYn;
    private String description;
    private int    rgtrId;
    private ZonedDateTime regDt;
    private int    mdfrId;
    private ZonedDateTime mdfDt;
}
