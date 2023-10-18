package com.cp.praha.knowledge.manualrelation.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter @Setter
public class ManualRelationDeleteCommand {

    @NotNull(message = "기준 매뉴얼 아이디는 필수입니다.")
    private Integer manualId;
    @NotNull(message = "연관 매뉴얼 아이디는 필수입니다.")
    private List<Integer> relationManualIds;
}
