package com.cp.praha.knowledge.manualqna.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ManualInsertQnaCommand {
    private String manualType;
    @NotNull(message = "매뉴얼아이디 값은 필수입니다.")
    @Min(value = 1, message = "parentId 값은 1이상이어야 합니다.")
    private Integer parentId;
    private Integer manualIdx;
    private String title;
    private String contents;
    private String html;
}
