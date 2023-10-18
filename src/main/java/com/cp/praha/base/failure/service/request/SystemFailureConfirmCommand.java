package com.cp.praha.base.failure.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SystemFailureConfirmCommand {
    private String systemFailureUuid;
    private int confirmId;
}
