package com.cp.praha.base.logInfo.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class LogInfoExcelDownSelectCommand {
    private String startDt;
    private String endDt;
    @NotNull(message = "userId 필수입니다.")
    @Min(value = 0, message = "userId 값은 0이상이어야 합니다.")
    private Integer userId;
    private String userCd;
    private String outputYn;
    private String sortType;
    private Integer page;
    private Integer totalPage;
}
