package com.cp.praha.work.smsconfig.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SmsSpamTelNoSelectPageCommand {
    private String startDt;
    private String endDt;
    private String telNo;
    private String sortType;
    private int    page;
    private int    totalpage;
}
