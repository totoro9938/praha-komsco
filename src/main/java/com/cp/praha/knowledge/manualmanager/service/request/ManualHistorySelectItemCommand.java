package com.cp.praha.knowledge.manualmanager.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter @Setter
public class ManualHistorySelectItemCommand {
    @NotNull(message = "매뉴얼 아이디는 필수입니다.")
    @Min(value = 1)
    private Integer manualId;
    @NotNull(message = "매뉴얼 번호는 필수입니다.")
    @Min(value = 0)
    private Integer manualIdx;
}
