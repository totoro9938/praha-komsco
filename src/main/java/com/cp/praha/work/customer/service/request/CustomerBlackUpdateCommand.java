package com.cp.praha.work.customer.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter @Setter
public class CustomerBlackUpdateCommand {

    @NotNull(message = "아이디 값은 필수입니다.")
    private Integer custBlackId;
    @NotBlank
    private String processStatus;
    private String rejectReason;
    private int mdfrId;
}
