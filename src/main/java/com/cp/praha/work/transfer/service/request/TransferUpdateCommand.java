package com.cp.praha.work.transfer.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class TransferUpdateCommand {
    @NotNull(message = "바운드 아이디는 필수입니다.")
    @Min(value=0,message = "바운드 아이디는 0이상이여야합니다.")
    private int boundId;
    @NotNull(message = "콜아이디는 필수입니다.")
    @Min(value=0,message = "콜아이디는 0이상이여야합니다.")
    private int callId;
    private int chargeId;
    private int chargeIdOld;
    private int deptId;
    private String transferAnswer;
    private String transferStatus;
    private int mdfrId;
}
