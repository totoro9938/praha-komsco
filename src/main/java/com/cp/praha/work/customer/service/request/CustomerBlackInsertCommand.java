package com.cp.praha.work.customer.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter @Setter
public class CustomerBlackInsertCommand {

    @NotNull(message = "고객 아이디는 필수입니다.")
    private Integer custId;
    @NotBlank(message = "수/발신번호는 필수입니다.")
    private String boundTelNo;
    @NotNull(message = "바운드 아이디는 필수입니다.")
    private Integer boundId;
    @NotNull(message = "상담 아이디는 필수입니다.")
    private Integer callId;
    private String custType;
    private String requestReason;
    private int rgtrId;

}
