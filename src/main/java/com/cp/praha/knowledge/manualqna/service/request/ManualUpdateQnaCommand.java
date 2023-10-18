package com.cp.praha.knowledge.manualqna.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ManualUpdateQnaCommand {
    @NotNull(message = "매뉴얼아이디 값은 필수입니다.")
    @Min(value = 1, message = "parentId 값은 1이상이어야 합니다.")
    private Integer parentId;
    @NotNull(message = "Q&A아이디 값은 필수입니다.")
    @Min(value = 1, message = "manualId 값은 1이상이어야 합니다.")
    private Integer manualId;
    private Integer manualIdx;
    private String title;
    private String contents;
    private String html;
}
