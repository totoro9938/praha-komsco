package com.cp.praha.main.login.entity;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;


//@Component
@Getter
@Setter
//@RedisHash("cp-session")
//@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class SessionEntity {


    private int userId;
    @Id
    private String userUuid;
    private String userCd;
    private String userPwd;
    private String userNm;
    private String loginYn;
    private int groupUid;
    private String description;
    private int deptId;
    private int topDeptId;
    private String duty;
    private String enterYmd;
    private String retireYmd;
    private String telNo;
    private String hpNo;
    private String useYn;
    private String validationYn;
    private String sysYn;
    private String callDefaultUrl;
    private int callProgramId;
    private int webProgramId;
    private int homeProgramId;
    private String pwdChangeYn;
    private int dormantDay;  // 비밀번호 정기 변경일수
    private String pwdChangeDt;              // 비밀번호 변경일자
    private String adminYn;   // 관리자여부
    private String authYn;
    private String deptNm;
    private String lastLoginDt;
    private String ctiPwd;

}
