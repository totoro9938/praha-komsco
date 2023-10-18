package com.cp.praha.knowledge.manualconsult.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ManualConsultKeywordSelectCommand {
    @NotBlank(message = "검색타입은 필수입니다.")
    private String type;
    private String outputYn;
    private Integer totalPage;
}
