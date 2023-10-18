package com.cp.praha.work.transfer.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class TransferSelectPageCommand {
    private String startDate;
    private String endDate;
    private int    parentId;
    private int    deptId;
    private int    chargeParentId;
    private int    chargeDeptId;
    private int    rgtrId;
    private int    chargeId;
    private String transferStatus;
    private String searchType;
    private String searchTxt;
    private String sortType;
    private int    page;
    private int    totalpage;
}
