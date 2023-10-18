package com.cp.praha.knowledge.manualrequest.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter @Setter
public class ManualRequestInsertCommand {

    @NotNull(message = "부서 아이디는 필수입니다.")
    @Min(value = 0)
    private Integer deptId;
    @NotNull(message = "담당자 아이디는 필수입니다.")
    @Min(value = 0)
    private Integer chargeId;
    private String requestReasonType;
    private String requestReason;
    private String requestManualStatus;
    private String approvalYn;
    private Integer manualId;

}
