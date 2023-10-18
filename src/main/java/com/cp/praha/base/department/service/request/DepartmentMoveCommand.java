package com.cp.praha.base.department.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class DepartmentMoveCommand {
    private String objectDeptId;
    @NotNull(message = "이동할 부서의 정보가 비어있습니다.")
    private Integer targetDeptId;
    private Integer moveType;
}
