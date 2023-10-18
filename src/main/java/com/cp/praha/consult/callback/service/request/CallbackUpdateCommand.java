package com.cp.praha.consult.callback.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class CallbackUpdateCommand {
    @NotNull(message = "콜백아이디는 필수입니다.")
    @Min(value = 1, message = "콜백아이디는 1이상 이어야 합니다.")
    private int callbackId;
    private int custId;
    @NotBlank(message = "처리결과는 필수입니다.")
    private String callbackStatus;
    @NotBlank(message = "처리내용는 필수입니다.")
    private String description;
}
