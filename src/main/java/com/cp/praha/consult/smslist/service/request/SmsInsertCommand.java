package com.cp.praha.consult.smslist.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class SmsInsertCommand {
    private Integer smsGroupId;
    private String smsUuid;
    private Integer smsId;
    private Integer custId;
    private String custNm;
    private String srcId01;
    private String srcId02;
    private String srcId03;
    private Integer smsTemplateId;
    private String smsType;
    private String reservationDt;
    @NotBlank(message = "수신번호는 필수입니다.")
    private String toTelNo;
    @NotBlank(message = "발신번호는 필수입니다.")
    private String fromTelNo;
    private String message;
    private String imagePath_01;
    private String imagePath_02;
    private String imagePath_03;
    private String smsKind;
    private String result;
    private String resultMessage;
    private Integer rgtrId;

}
