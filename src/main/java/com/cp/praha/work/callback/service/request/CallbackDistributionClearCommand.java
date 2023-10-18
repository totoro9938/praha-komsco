package com.cp.praha.work.callback.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CallbackDistributionClearCommand {
    private String callbackId;
    @NotNull(message = "회수할 콜백건수가 없습니다.")
    private int    callbackCnt;
    private int mdfrId;
}
