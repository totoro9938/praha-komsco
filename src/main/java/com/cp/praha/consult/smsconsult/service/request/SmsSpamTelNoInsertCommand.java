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
public class SmsSpamTelNoInsertCommand {
    @NotBlank(message = "스팸동록할 번호는 필수입니다.")
    private String spamTelNo;
    @NotNull(message = "smsRvId는 필수입니다.")
    @Min(value = 1, message = "smsRvId는 1이상 이어야 합니다.")
    private int    smsRvId;
    //private String smsMid;
}
