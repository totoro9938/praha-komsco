package com.cp.praha.knowledge.manualmanager.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ManualHistorySelectCommand {
    private Integer manualId;
    private String outputYn;
}
