package com.cp.praha.base.department.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class DepartmentSelectItemCommand {
    @NotEmpty(message = "부서 정보가 비어있습니다.")
    private String deptUuid;
}
