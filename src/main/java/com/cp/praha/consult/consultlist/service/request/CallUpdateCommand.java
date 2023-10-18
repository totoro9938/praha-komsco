package com.cp.praha.consult.consultlist.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CallUpdateCommand {
    private int    boundId;
    private int    callId;
    private String callClass;
    private int    callCatId;
    private String question;
    private String answer;
    private String memo;
    private int mdfrId;
}
