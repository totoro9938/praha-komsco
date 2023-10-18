package com.cp.praha.main.login.entity;

public final class SessionEntityBuilder {
    private int userId;
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

    private SessionEntityBuilder() {
    }

    public static SessionEntityBuilder aSessionEntity() {
        return new SessionEntityBuilder();
    }

    public SessionEntityBuilder withUserId(int userId) {
        this.userId = userId;
        return this;
    }

    public SessionEntityBuilder withUserUuid(String userUuid) {
        this.userUuid = userUuid;
        return this;
    }

    public SessionEntityBuilder withUserCd(String userCd) {
        this.userCd = userCd;
        return this;
    }

    public SessionEntityBuilder withUserPwd(String userPwd) {
        this.userPwd = userPwd;
        return this;
    }

    public SessionEntityBuilder withUserNm(String userNm) {
        this.userNm = userNm;
        return this;
    }

    public SessionEntityBuilder withLoginYn(String loginYn) {
        this.loginYn = loginYn;
        return this;
    }

    public SessionEntityBuilder withGroupUid(int groupUid) {
        this.groupUid = groupUid;
        return this;
    }

    public SessionEntityBuilder withDescription(String description) {
        this.description = description;
        return this;
    }

    public SessionEntityBuilder withDeptId(int deptId) {
        this.deptId = deptId;
        return this;
    }

    public SessionEntityBuilder withTopDeptId(int topDeptId) {
        this.topDeptId = topDeptId;
        return this;
    }

    public SessionEntityBuilder withDuty(String duty) {
        this.duty = duty;
        return this;
    }

    public SessionEntityBuilder withEnterYmd(String enterYmd) {
        this.enterYmd = enterYmd;
        return this;
    }

    public SessionEntityBuilder withRetireYmd(String retireYmd) {
        this.retireYmd = retireYmd;
        return this;
    }

    public SessionEntityBuilder withTelNo(String telNo) {
        this.telNo = telNo;
        return this;
    }

    public SessionEntityBuilder withHpNo(String hpNo) {
        this.hpNo = hpNo;
        return this;
    }

    public SessionEntityBuilder withUseYn(String useYn) {
        this.useYn = useYn;
        return this;
    }

    public SessionEntityBuilder withValidationYn(String validationYn) {
        this.validationYn = validationYn;
        return this;
    }

    public SessionEntityBuilder withSysYn(String sysYn) {
        this.sysYn = sysYn;
        return this;
    }

    public SessionEntityBuilder withCallDefaultUrl(String callDefaultUrl) {
        this.callDefaultUrl = callDefaultUrl;
        return this;
    }

    public SessionEntityBuilder withCallProgramId(int callProgramId) {
        this.callProgramId = callProgramId;
        return this;
    }

    public SessionEntityBuilder withWebProgramId(int webProgramId) {
        this.webProgramId = webProgramId;
        return this;
    }

    public SessionEntityBuilder withHomeProgramId(int homeProgramId) {
        this.homeProgramId = homeProgramId;
        return this;
    }

    public SessionEntityBuilder withPwdChangeYn(String pwdChangeYn) {
        this.pwdChangeYn = pwdChangeYn;
        return this;
    }

    public SessionEntityBuilder withDormantDay(int dormantDay) {
        this.dormantDay = dormantDay;
        return this;
    }

    public SessionEntityBuilder withPwdChangeDt(String pwdChangeDt) {
        this.pwdChangeDt = pwdChangeDt;
        return this;
    }

    public SessionEntityBuilder withAdminYn(String adminYn) {
        this.adminYn = adminYn;
        return this;
    }

    public SessionEntityBuilder withAuthYn(String authYn) {
        this.authYn = authYn;
        return this;
    }

    public SessionEntityBuilder withDeptNm(String deptNm) {
        this.deptNm = deptNm;
        return this;
    }

    public SessionEntityBuilder withLastLoginDt(String lastLoginDt) {
        this.lastLoginDt = lastLoginDt;
        return this;
    }
    public SessionEntityBuilder withCtiPwd(String ctiPwd) {
        this.ctiPwd = ctiPwd;
        return this;
    }

    public SessionEntity build() {
        SessionEntity sessionEntity = new SessionEntity();
        sessionEntity.setUserId(userId);
        sessionEntity.setUserUuid(userUuid);
        sessionEntity.setUserCd(userCd);
        sessionEntity.setUserPwd(userPwd);
        sessionEntity.setUserNm(userNm);
        sessionEntity.setLoginYn(loginYn);
        sessionEntity.setGroupUid(groupUid);
        sessionEntity.setDescription(description);
        sessionEntity.setDeptId(deptId);
        sessionEntity.setTopDeptId(topDeptId);
        sessionEntity.setDuty(duty);
        sessionEntity.setEnterYmd(enterYmd);
        sessionEntity.setRetireYmd(retireYmd);
        sessionEntity.setTelNo(telNo);
        sessionEntity.setHpNo(hpNo);
        sessionEntity.setUseYn(useYn);
        sessionEntity.setValidationYn(validationYn);
        sessionEntity.setSysYn(sysYn);
        sessionEntity.setCallDefaultUrl(callDefaultUrl);
        sessionEntity.setCallProgramId(callProgramId);
        sessionEntity.setWebProgramId(webProgramId);
        sessionEntity.setHomeProgramId(homeProgramId);
        sessionEntity.setPwdChangeYn(pwdChangeYn);
        sessionEntity.setDormantDay(dormantDay);
        sessionEntity.setPwdChangeDt(pwdChangeDt);
        sessionEntity.setAdminYn(adminYn);
        sessionEntity.setAuthYn(authYn);
        sessionEntity.setDeptNm(deptNm);
        sessionEntity.setLastLoginDt(lastLoginDt);
        sessionEntity.setCtiPwd(lastLoginDt);
        return sessionEntity;
    }
}
