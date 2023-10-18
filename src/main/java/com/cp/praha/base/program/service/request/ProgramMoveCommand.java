package com.cp.praha.base.program.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ProgramMoveCommand {
    @NotBlank(message = "objectProgramId 값은 필수입니다.")
    private String  objectProgramId;
    @NotBlank(message = "targetProgramId 값은 필수입니다.")
    private String  targetProgramId;

    private int mdfrId;
}
