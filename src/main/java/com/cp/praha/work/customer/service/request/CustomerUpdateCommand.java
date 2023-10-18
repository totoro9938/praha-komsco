package com.cp.praha.work.customer.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
public class CustomerUpdateCommand {

    @NotNull(message = "고객 아이디는 필수입니다.")
    private Integer custId;
    private String custNm;
    private String custType;
    private String telNo;
    private String hpNo;
    private String boundTelNo;
    private String smsYn;
    private String telYn;
    private String description;
    private int mdfrId;

}
