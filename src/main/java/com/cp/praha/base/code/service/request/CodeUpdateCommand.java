package com.cp.praha.base.code.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class CodeUpdateCommand {
    @NotNull(message = "codeId는 필수입니다.")
    @Min(value = 0, message = "codeId 값은 0이상이어야 합니다.")
    private int    codeId;
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
    private int mdfrId;
}
