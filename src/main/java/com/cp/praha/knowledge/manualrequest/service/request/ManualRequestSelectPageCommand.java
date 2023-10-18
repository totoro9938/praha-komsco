package com.cp.praha.knowledge.manualrequest.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ManualRequestSelectPageCommand {

    private String startDate;
    private String endDate;
    private Integer parentId;
    private Integer deptId;
    private Integer chargeId;
    private Integer requestUserId;
    private String requestManualStatus;
    private String requestReasonType;
    private String requestReason;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;
}
