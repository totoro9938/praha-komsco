package com.cp.praha.knowledge.manualworker.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManualWorkerDeleteCommand {
    private String manualWorkerUuid;
    private Integer mdfrId;
    private Integer manualId;
}
