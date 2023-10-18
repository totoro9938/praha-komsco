package com.cp.praha.work.customer.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CustomerInsertCommand {

    private String custUuid;
    private String custNm;
    private Integer custNo;
    private String birthDay;
    private String gender;
    private String custType;
    private String telNo;
    private String hpNo;
    private String boundTelNo;
    private String personInfoUseYn;
    private String email;
    private String emailYn;
    private String smsYn;
    private String telYn;
    private String description;
    private int rgtrId;

}
