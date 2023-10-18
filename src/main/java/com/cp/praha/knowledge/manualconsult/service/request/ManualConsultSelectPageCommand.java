package com.cp.praha.knowledge.manualconsult.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ManualConsultSelectPageCommand {
    private String manualType;
    @NotNull(message = "상담분류는 필수입니다.")
    @Min(value = 0)
    private Integer callCatId;
    private String keyword;
    private String condition;
    private String keywordType;
    private String importance;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;
}
