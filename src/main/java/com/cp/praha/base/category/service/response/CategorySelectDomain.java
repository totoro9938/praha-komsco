package com.cp.praha.base.category.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
@Entity
public class CategorySelectDomain {
    @NotEmpty
    @Id
    private int no;
    private String  companyCd;
    private int catId;
    private String  catUuid;
    private int parentId;
    private String  catGroupCd;
    private int catLvl;
    private int catIdx;
    private String  catPath;
    private String  sortPath;
    private String  valuePath;
    private String  catNm;
    private String  fullCatNm;
    private String  catValue;
    private String  catValue_01;
    private String  catValue_02;
    private String  catValue_03;
    private String  catValue_04;
    private String  catValue_05;
    private String  useYn;
    private String  inheritUseYn;
    private String  sysYn;
    private String  delYn;
    private String  inheritDelYn;
    private String  description;
    private int rgtrId;
    private ZonedDateTime regDt;
    private int mdfrId;
    private ZonedDateTime  mdfDt;
}
