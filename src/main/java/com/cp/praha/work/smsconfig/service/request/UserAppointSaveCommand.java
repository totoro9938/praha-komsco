package com.cp.praha.work.smsconfig.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UserAppointSaveCommand {
    private String appointType;
    @NotNull(message = "담당자 선택은 필수입니다.")
    private int userId;
    private String jobGb;
    private int rgtrId;
}
