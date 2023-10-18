package com.cp.praha.main.common.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CtiCallbackCommand {
    private String CALLBACK_DT;
    private String INBOUND_TEL_NO;
    private String CALLBACK_TEL_NO;
    private String ROOT;
    private String BOUND_ROOT;

}
