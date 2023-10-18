package com.cp.praha.consult.smsconsult.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class SmsRvSmsInserCommand {
    //@NotBlank(message = "문자전송할 mid는 필수입니다.")
    private String smsRvMid;
    @NotNull(message = "smsRvId는 필수입니다.")
    @Min(value = 1, message = "smsRvId는 1이상 이어야 합니다.")
    private int    smsRvId;
    @NotBlank(message = "문자전송할 번호는 필수입니다.")
    private String toTelNo;
    private int    smsTemplateId;
    private String message;
}
