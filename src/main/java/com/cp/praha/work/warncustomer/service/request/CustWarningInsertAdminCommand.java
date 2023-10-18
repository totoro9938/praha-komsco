package com.cp.praha.work.warncustomer.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustWarningInsertAdminCommand {
    private String boundTelNo;
    private int custWarningId;
    private String warningType;
    private String requestYmd;
    private String requestReason;
    private String processStatus;
    private String processReason;
    private String startYmd;
    private String endYmd;
    private int rgtrId;
    private int mdfrId;
}
