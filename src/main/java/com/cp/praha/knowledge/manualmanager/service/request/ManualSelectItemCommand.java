package com.cp.praha.knowledge.manualmanager.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ManualSelectItemCommand {

    private String manualUuid;
    private String outputYn;
}
