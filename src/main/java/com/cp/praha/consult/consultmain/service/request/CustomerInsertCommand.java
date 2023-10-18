package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CustomerInsertCommand {
    private String  custNm;
    private String  telNo;
    private String  hpNo;
    private String  boundTelNo;
    private String  smsYn;
    private String  telYn;
    private String  description;
    private String custUuid;
}
