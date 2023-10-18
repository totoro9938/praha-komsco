package com.cp.praha.base.department.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
@Getter
@Setter
public class DepartmentDeleteCommand {
    @NotEmpty
    private Integer deptId;
    @NotEmpty
    private Integer mdfrId;
}
