package com.cp.praha.knowledge.manualmanager.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter @Setter
public class ManualDeleteCommand {

    @NotNull(message = "매뉴얼 아이디는 필수입니다.")
    @Min(value = 1)
    private Integer manualId;
    private String manualType;
    private String requestReason;
    private String approvalYn;
}
