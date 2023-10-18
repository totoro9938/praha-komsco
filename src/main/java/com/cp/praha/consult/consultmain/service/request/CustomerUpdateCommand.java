package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class CustomerUpdateCommand {
    @NotNull(message = "고객 정보는 필수입니다.")
    private Integer custId;
    private String  custNm;
    private String  telNo;
    private String  hpNo;
    private String  boundTelNo;
    private String  smsYn;
    private String  telYn;
    private String  description;
}
