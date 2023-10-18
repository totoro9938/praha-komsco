package com.cp.praha.common.log.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PrivateLogInsertCommand {
    private String dataGb;
    private String description;
}
