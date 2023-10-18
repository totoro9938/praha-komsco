package com.cp.praha.base.category.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class CategoryInsertCommand {
    private String  catGroupCd;
    private Integer parentId;
    private Integer catIdx;
    @NotBlank(message = "상담분류명이 비어있습니다.")
    private String  catNm;
    private String  catValue;
    private String  catValue_01;
    private String  catValue_02;
    private String  catValue_03;
    private String  catValue_04;
    private String  catValue_05;
    private String  useYn;
    private String  delYn;
    private String  sysYn;
    private String  description;
    private String  reIdxYn;
    private int rgtrId;
}
