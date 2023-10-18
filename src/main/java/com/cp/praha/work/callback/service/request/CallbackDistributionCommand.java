package com.cp.praha.work.callback.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class CallbackDistributionCommand {
    private String callbackId;
    @NotNull(message = "분배할 콜백건수가 없습니다.")
    private int    callbackCnt;
    private String userId;
    private String cnt;
    @NotNull(message = "분배할 상담사수가 없습니다")
    private int    userCnt;
    private int mdfrId;
}
