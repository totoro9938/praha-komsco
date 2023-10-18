package com.cp.praha.work.employee.service.response;

import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class EmployeeDeptVO {
    private String deptId;
    private String deptName;
    private String upperDeptId;
    private String deptOrder;
    private String deptDepth;
}
