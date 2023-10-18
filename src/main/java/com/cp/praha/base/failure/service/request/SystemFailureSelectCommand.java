package com.cp.praha.base.failure.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter

public class SystemFailureSelectCommand {

    private String startDate;
    private String endDate;
    private String systemFailureType;
    private String systemFailureWorkCd;
    private String searchTxt;
}

