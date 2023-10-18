package com.cp.praha.knowledge.manualrequest.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
public class ManualRequestRejectCommand {

    @NotNull(message = "매뉴얼 아이디는 필수입니다.")
    private Integer requestManualId;
    private String rejectReason;
}
