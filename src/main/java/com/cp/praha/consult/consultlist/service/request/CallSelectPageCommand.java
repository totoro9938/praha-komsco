package com.cp.praha.consult.consultlist.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CallSelectPageCommand {
    private String startDate;
    private String endDate;
    private int    custId;
    private String callClass;
    private int    callCatId;
    private String callStatus;
    private String callType;
    private int    parentId;
    private int    deptId;
    private int    userId;
    private String boundType;
    private String searchType;
    private String searchTxt;
    private String completeYn;
    private String sortType;
    private int    page;
    private int    totalPage;
}
