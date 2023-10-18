package com.cp.praha.knowledge.manualworker.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManualWorkerInsertCommand {
    private String manualWorkerUuid;
    private Integer manualId;
    private String workerNm;
    private String workerTelNo;
    private Integer rgtrId;
}
