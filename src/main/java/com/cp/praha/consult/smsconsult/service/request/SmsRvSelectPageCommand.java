package com.cp.praha.consult.smsconsult.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SmsRvSelectPageCommand {
    private String startDt;
    private String endDt;
    private int    parentId;
    private int    deptId;
    private int    userId;
    private String telNo;
    private String smsRvStatus;
    private String spamYn;
    private String sortType;
    private int    page;
    private int    totalpage;
}
