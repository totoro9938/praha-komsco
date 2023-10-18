package com.cp.praha.work.warncustomer.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustWarningSelPageCommand {
    private String startDate;
    private String endDate;
    private String warningType;
    private String processStatus;
    private String searchType;
    private String searchTxt;
    private String sortType;
    private String outputYn;
    private int page;
    private int totalPage;
}
