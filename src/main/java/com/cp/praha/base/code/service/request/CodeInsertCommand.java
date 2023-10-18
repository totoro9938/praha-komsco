package com.cp.praha.base.code.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class CodeInsertCommand {
    @NotBlank(message = "코드그룹CD는 필수입니다.")
    private String codeGroupCd;
    private int    parentId;
    private int    codeIdx;
    @NotBlank(message = "코드명은 필수입니다.")
    private String codeNm;
    @NotBlank(message = "코드키값은 필수입니다.")
    private String codeKey;
    private String codeValue_01;
    private String codeValue_02;
    private String codeValue_03;
    private String codeValue_04;
    private String codeValue_05;
    private String useYn;
    private String sysYn;
    private String delYn;
    private String description;
    private String reIdxYn;
    private int rgtrId;
}
