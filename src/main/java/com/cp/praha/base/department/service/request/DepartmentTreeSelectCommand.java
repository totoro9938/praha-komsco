package com.cp.praha.base.department.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Setter
@Getter
public class DepartmentTreeSelectCommand {

    @NotNull(message = "상위 부서 정보가 비어있습니다.")
    private Integer parentId;
    @NotNull(message = "부서 정보가 비어있습니다.")
    private Integer deptId;
}
