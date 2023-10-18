package com.cp.praha.base.user.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter @Setter
public class UserUploadCommand {

    private String userUuid;
    private Integer saveCnt;
    private Integer uploadIdx;
    @NotBlank(message = "아이디는 필수입니다.")
    private String userCd;
    @NotBlank(message = "이름은 필수입니다.")
    private String userNm;
    private Integer userIdx;
    private String telNo;
    private String hpNo;
    private String email;
    @NotBlank(message = "부서는 필수입니다.")
    private String deptCd;
    private String duty;
    private String positionNm;
    private String useYnNm;
    private String enterDt;
    private String retireDt;
    private String description;
    private String ip;
    private Integer rgtrId;

}
