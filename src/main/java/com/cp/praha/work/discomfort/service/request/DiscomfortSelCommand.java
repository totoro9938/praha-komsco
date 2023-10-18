package com.cp.praha.work.discomfort.service.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DiscomfortSelCommand {

    private String startDate;
    private String endDate;
    private String discomfortWorkType;
    private String processCat;
    private String processOffice;
    private String discomfortStatus;
    private String discomfortCustType;
    private String deptCenterCd;
    private int rgtrId;
    private int processUserId;
    private int custId;
    private String searchType;
    private String searchTxt;
    private String sortType;
    private int page;
    private int totalPage;

}
