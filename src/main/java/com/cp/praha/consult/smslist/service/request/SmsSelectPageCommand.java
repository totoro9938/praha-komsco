package com.cp.praha.consult.smslist.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Setter
@Getter
public class SmsSelectPageCommand {
    @NotNull(message = "부서아이디가 존재해야 합니다.")
    private Integer deptId;
    @NotNull(message = "부서아이디가 존재해야 합니다.")
    private Integer parentId;
    @NotNull(message = "유저아이디가 존재해야 합니다.")
    private Integer userId;
    private Integer custId;
    private String startDt;
    private String endDt;
    private String smsKind;
    private String result;
    private String searchType;
    private String searchTxt;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;
}

