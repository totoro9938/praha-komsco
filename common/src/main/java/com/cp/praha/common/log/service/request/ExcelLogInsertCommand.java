package com.cp.praha.common.log.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ExcelLogInsertCommand {
    private int programId;
    private int dataCnt;
    private String description;
    private String reason;
}
