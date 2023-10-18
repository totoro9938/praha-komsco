package com.cp.praha.base.department.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class DepartmentInsertCommand {
    private String deptCd;
    @NotNull(message = "상위부서 정보가 비어있습니다.")
    private Integer parentId;
    private Integer deptIdx;
    @NotEmpty(message = "부서 이름이 비어있습니다.")
    private String deptNm;
    private String deptUuid;
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
    private String sysYn;
    private String useYn;
    private String delYn;
    private String description;
    private String reIdxYn;
    private int rgtrId;
}
