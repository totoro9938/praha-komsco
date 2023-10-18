package com.cp.praha.base.code.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class CodeGroupInsertCommand {
    @NotBlank(message = "코드그룹CD는 필수입니다.")
    private String codeGroupCd;
    @NotBlank(message = "코드그룹명은 필수입니다.")
    private String codeGroupNm;
    private int    codeGroupIdx;
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
    private String description;
    private int rgtrId;
}
