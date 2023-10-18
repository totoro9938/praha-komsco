package com.cp.praha.base.program.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Setter
@Getter
public class ProgramSelectCommand {

    private String treeYn;
    @NotNull(message = "parentId값은 필수입니다.")
    @Min(value = 0, message = "parentId 값은 0이상이어야 합니다.")
    private Integer parentId;
    private String useYn;
    private String delYn;
    private String outputYn;
    private String sortType;
}
