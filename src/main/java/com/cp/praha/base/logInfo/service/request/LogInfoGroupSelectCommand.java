package com.cp.praha.base.logInfo.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogInfoGroupSelectCommand {
    private String startDt;
    private String endDt;
    private Integer rgtrId;
    private String userCd;
    private String outputYn;
    private String sortType;
    private Integer page;
    private Integer totalPage;
}
