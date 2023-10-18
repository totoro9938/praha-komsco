package com.cp.praha.work.callback.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CallbackSelectPageCommand {
    private String  distributionYn;
    private String  dateType;
    private String  startDate;
    private String  endDate;
    private int     parentId;
    private int     deptId;
    private int     userId;
    private String  callbackStatus;
    private String  searchType;
    private String  searchTxt;
    private String  route;
    private String  todaywork;
    private String  completeYn;
    private String  sortType;
    private int     page;
    private int     totalPage;
}
