package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class ConsultSmsInsertCommand {
    private int custId;
    private String custNm;
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
