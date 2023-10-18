package com.cp.praha.base.failure.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SystemFailureInsertCommand {
    private String systemFailureUuid;
    private String systemFailureType;
    private String systemFailureWorkCd;
    private String systemFailureContents;
    private String systemFailureAction;
    private String systemFailureWorker;
    private String outbreakDt;
    private String arriveDt;
    private String startDt;
    private String endDt;
    private int rgtrId;
}
