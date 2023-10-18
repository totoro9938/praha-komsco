package com.cp.praha.base.failure.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SystemFailureDeleteCommand {
    private String companyCd;
    private String systemFailureUuid;
    private int mdfrId;
}
