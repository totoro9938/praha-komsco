package com.cp.praha.consult.administrative.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class AdministSmsInsertCommand {
    private int smsTemplateId;
    @NotBlank(message = "수신번호는 필수입니다.")
    private String toTelNo;
    @NotBlank(message = "발신번호는 필수입니다.")
    private String fromTelNo;
    @NotBlank(message = "문자 내용은 필수입니다.")
    private String message;
    @NotBlank(message = "문자 발송 종류는 필수입니다.")
    private String smsKind;
}
