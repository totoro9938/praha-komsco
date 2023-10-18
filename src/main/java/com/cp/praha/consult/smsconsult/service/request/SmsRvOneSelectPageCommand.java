package com.cp.praha.consult.smsconsult.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SmsRvOneSelectPageCommand {
    private String startDt;
    private String endDt;
    private String telNo;
    private int userId;
    private String smsRvStatus;
    private String smsKind;
    private String result;
    private String sortType;
    private int    page;
    private int    totalpage;
}
