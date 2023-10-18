package com.cp.praha.base.department.service.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
public class DepartmentSelectCommand {
    private String treeYn;
    @NotNull(message = "상위 부서 정보가 비어있습니다.")
    private Integer parentId;
    private String useYn;
    private String delYn;
    private String outputYn;
    private String sortType;

}
