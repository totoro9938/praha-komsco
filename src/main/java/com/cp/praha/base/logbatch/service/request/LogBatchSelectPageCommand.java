package com.cp.praha.base.logbatch.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class LogBatchSelectPageCommand {

    private String startDt;
    private String endDt;
    private Integer page;
    private Integer totalPage;
}
