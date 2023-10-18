package com.cp.praha.base.department.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class DepartmentTreeSelectDomain {
    private String companyCd;
    @Id
    private String deptId;
    private String deptUuid;
    private String deptCd;
    private String topDeptId;
    private String parentId;
    private String deptLvl;
    private String deptIdx;
    private String deptPath;
    private String sortPath;
    private String deptNm;
    private String fullDeptNm;
    private String telNo;
    private String faxNo;
    private String deptValue_01;
    private String deptValue_02;
    private String deptValue_03;
    private String deptValue_04;
    private String deptValue_05;
    private String deptValue_06;
    private String deptValue_07;
    private String deptValue_08;
    private String deptValue_09;
    private String deptValue_10;
    private String validationYn;
    private String sysYn;
    private String inheritSysYn;
    private String useYn;
    private String inheritUseYn;
    private String delYn;
    private String inheritDelYn;
    private String description;
}
