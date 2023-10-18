package com.cp.praha.main.common.service.response;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class CodeDomain {

    private int codeId;
    private String companyCd;
    private String codeUuid;
    private String codeGroupCd;
    private int  parentId;
    private int codeLvl;
    private int codeIdx;
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

    private List<CodeDomain> items = new ArrayList<>();
}
