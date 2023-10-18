package com.cp.praha.base.program.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProgramSelectItemCommand {

    private String programUuid;
    private String outputYn;
}
