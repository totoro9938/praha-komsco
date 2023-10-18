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
public class VisitorCallbackInsertCommand {
    @NotNull(message = "콜백아이디는 필수입니다.")
    @Min(value = 1, message = "콜백아이디는 1이상 이어야 합니다.")
    private int callbackId;
    @NotBlank(message = "수/발신번호는 필수입니다.")
    private String boundTelNo;
}
