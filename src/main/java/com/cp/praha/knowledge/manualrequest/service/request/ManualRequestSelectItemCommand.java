package com.cp.praha.knowledge.manualrequest.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ManualRequestSelectItemCommand {

    private Integer requestManualId;
    private String outputYn;
}
