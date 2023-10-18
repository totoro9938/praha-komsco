package com.cp.praha.base.department.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentUploadCommand {
    private String companyCd = "CENTERLINK";
    private Integer saveCnt;
    private String parentDeptCd;
    private String parentDeptNm;
    private String deptCd;
    private String deptNm;
    private String rgtrId;
    private String ip;

}
