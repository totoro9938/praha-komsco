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
public class CategoryMoveTreeSelectDomain {
    private String companyCd;
    private String parentId;
    @Id
    private String id;
    private String nm;
    private String catId;
    private String catUuid;
    private String catPath;
    private String sortPath;
    private String catLvl;
    private String catIdx;
}
