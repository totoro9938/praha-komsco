package com.cp.praha.knowledge.manualworker.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManualWorkerUpdateCommand {
    private String manualWorkerUuid;
    private Integer manualId;
    private String workerNm;
    private String workerTelNo;
    private int mdfrId;
}
