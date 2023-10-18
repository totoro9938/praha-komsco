package com.cp.praha.base.user.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter @Setter
public class UserUptCommand {

    @NotBlank(message = "아이디는 필수입니다.")
    private String userCd;
    private int userId;
    @NotBlank(message = "이름은 필수입니다.")
    private String userNm;
    private int userIdx;
    private String telNo;
    private String hpNo;
    private String email;
    @NotNull(message = "부서는 필수입니다.")
    private int deptId;
    private String duty;
    private String positionNm;
    @NotBlank
    private String useYn;
    private String delYn;
    private String enterDt;
    private String retireDt;
    private String ctiYn;
    private String ctiId;
    private String ctiPwd;
    private String ctiStation;
    @NotNull(message = "사용자그룹은 필수입니다.")
    private int groupUid;
    private String description;
    private String ip;
    private int mdfrId;
}
