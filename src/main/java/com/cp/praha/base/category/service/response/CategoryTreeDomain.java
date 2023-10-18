package com.cp.praha.base.category.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class CategoryTreeDomain {
    @Id
    private int no;
    private String id;
    private String catGroupCd;
    private String catUuid;
    private int topCodeId;
    private int topCodeIdx;
    private int parentId;
    private String nm;
    private int lvl;
    private int catLvl;
    private String catId;
    private String catIdx;
    private String fullCatNm;
    private String catPath;
    private String sortPath;
    private String sysYn;
    private String useYn;
    private String inheritUseYn;
    private String delYn;
    private String inheritDelYn;
    private String catMaxLvl;
    private String fullCodeNm;
}
