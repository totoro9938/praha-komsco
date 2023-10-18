package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class CallCallCatDeleteCommand {
    private int callId;
    private int boundId;
    private List<Integer> catIds;
    private int userId;
}
