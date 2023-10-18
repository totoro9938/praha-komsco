package com.cp.praha.base.department.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class DepartmentInsertDomain {
    @NotEmpty
    @Id
    private Integer deptId;
}
