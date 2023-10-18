package com.cp.praha.base.group.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class ProgramAuthSaveCommand {

    @NotBlank(message = "프로그램 아이디는 필수입니다.")
    private Integer programId;
    private String actorType;
    @NotBlank(message = "그룹아이디는 필수입니다.")
    private Integer actorId;
    private String grantSelect;
    private String grantInsert;
    private String grantUpdate;
    private String grantDelete;
    private String grantPrint;
    private String grantDown;
    private String grantRangeAll;
    private String grantRangeSub;
    private String grantRangeOwn;
    private String agentSelect;
    private String grantAgent;
    private String grantExtend_01;
    private String grantExtend_02;
    private String grantExtend_03;
    private String grantExtend_04;
    private String grantExtend_05;
    private String grantExtend_06;
    private String grantExtend_07;
    private String grantExtend_08;
    private String grantExtend_09;
    private String grantExtend_10;
    private String grantExtend_11;
    private String grantExtend_12;
    private String grantExtend_13;
    private String grantExtend_14;
    private String grantExtend_15;
    private String description;
    private Integer authGroupUid;
    private String ip;
    private Integer userId;
}
