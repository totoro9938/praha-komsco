package com.cp.praha.knowledge.manualrelation.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter @Setter
public class ManualRelationSelectCommand {
    @NotNull(message = "매뉴얼아이디 값은 필수입니다.")
    @Min(value = 1, message = "manualId 값은 1이상이어야 합니다.")
    private Integer manualId;
    private String outputYn;
    private String sortType;
}
