package com.cp.praha.main.common.service.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CtiReportDomain {
    private int inBoundCallCnt;
    private int outBoundCallCnt;
    private String secReady;
    private String secCounsel;
    private String secAway;
    private String secAfter;
}
