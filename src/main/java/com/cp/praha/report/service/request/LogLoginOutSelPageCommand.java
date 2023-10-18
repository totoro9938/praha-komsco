package com.cp.praha.report.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class LogLoginOutSelPageCommand {
    private String startDt;
    private String endDt;
    private int userId;
    private int page;
    private int totalPage;
}
