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
public class CodeSelectDomain {
    private int no;
    private String companyCd;
    @Id
    private int    codeId;
    private String codeUuid;
    private int    parentId;
    private String codeGroupCd;
    private int    codeLvl;
    private int    codeIdx;
    private String codePath;
    private String sortPath;
    private String keyPath;
    private String codeNm;
    private String fullCodeNm;
    private String codeKey;
    private String codeValue_01;
    private String codeValue_02;
    private String codeValue_03;
    private String codeValue_04;
    private String codeValue_05;
    private String useYn;
    private String inheritUseYn;
    private String sysYn;
    private String inheritSysYn;
    private String delYn;
    private String inheritDelYn;
    private String description;
    private int    rgtrId;
    private ZonedDateTime regDt;
    private int    mdfrId;
    private ZonedDateTime mdfDt;
    private String selected;
}
