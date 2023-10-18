package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class CustomerBlackInsertCommand {
    @NotNull(message = "고객 정보는 필수입니다.")
    private Integer    custId;
    private String     boundTelNo;
    private Integer    boundId;
    private Integer    callId;
    @NotBlank(message = "고객 구분은 필수입니다.")
    private String     custType;
    @NotBlank(message = "등록 사유는 필수입니다.")
    private String     requestReason;
}
