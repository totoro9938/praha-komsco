package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CallCallCatCommand {
    private int callId;
    private int boundId;
    private int catId;
    private String callPart;
    private int userId;
}
