package com.cp.praha.common.login.service.response;

import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@ToString
@EqualsAndHashCode(of= {"userId"})
public class CpUserDetail implements UserDetails {

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
    private String pwdChangeDt;              // 비밀번호 변경일자
    private String adminYn;   // 관리자여부
    private String authYn;
    private String deptNm;
    private String lastLoginDt;
    private String ctiYn;
    private String ctiId;
    private String ctiPwd;
    private String ctiStation;
    private String connectIp;
    private boolean credentialsNonExpire = true;
    private boolean isEnabled = true;
    private String OtpUSeYn;
    private String secretKey;
    private String email;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOtpUSeYn() {
        return OtpUSeYn;
    }

    public void setOtpUSeYn(String otpUSeYn) {
        OtpUSeYn = otpUSeYn;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }


    Collection<GrantedAuthority> authorities =
            AuthorityUtils.createAuthorityList("ROLE_TRUSTED_CLIENT", "ROLE_ADMIN");

    public CpUserDetail(String username, String password) {
        this.userCd = username;
        this.userPwd = password;
    }
    public CpUserDetail() {}
    public CpUserDetail(int userId) {
        this.userId = userId;
    }

    /**
     * 유저레벨에 맞는 권한 반환.
     *
     * @return 유저권한
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void addAuthority(GrantedAuthority authority) {
        authorities.add(authority);
    }

    @Override
    public String getPassword() {
        return userPwd;
    }

    @Override
    public String getUsername() {
        return userCd;
    }

    public void setCredentialsNonExpire(boolean credentialsNonExpire) {
        this.credentialsNonExpire = credentialsNonExpire;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpire;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUserUuid() {
        return userUuid;
    }

    public void setUserUuid(String userUuid) {
        this.userUuid = userUuid;
    }

    public String getUserCd() {
        return userCd;
    }

    public void setUserCd(String userCd) {
        this.userCd = userCd;
    }

    public String getUserPwd() {
        return userPwd;
    }

    public void setUserPwd(String userPwd) {
        this.userPwd = userPwd;
    }

    public String getUserNm() {
        return userNm;
    }

    public void setUserNm(String userNm) {
        this.userNm = userNm;
    }

    public String getLoginYn() {
        return loginYn;
    }

    public void setLoginYn(String loginYn) {
        this.loginYn = loginYn;
    }

    public int getGroupUid() {
        return groupUid;
    }

    public void setGroupUid(int groupUid) {
        this.groupUid = groupUid;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getDeptId() {
        return deptId;
    }

    public void setDeptId(int deptId) {
        this.deptId = deptId;
    }

    public int getTopDeptId() {
        return topDeptId;
    }

    public void setTopDeptId(int topDeptId) {
        this.topDeptId = topDeptId;
    }

    public String getDuty() {
        return duty;
    }

    public void setDuty(String duty) {
        this.duty = duty;
    }

    public String getEnterYmd() {
        return enterYmd;
    }

    public void setEnterYmd(String enterYmd) {
        this.enterYmd = enterYmd;
    }

    public String getRetireYmd() {
        return retireYmd;
    }

    public void setRetireYmd(String retireYmd) {
        this.retireYmd = retireYmd;
    }

    public String getTelNo() {
        return telNo;
    }

    public void setTelNo(String telNo) {
        this.telNo = telNo;
    }

    public String getHpNo() {
        return hpNo;
    }

    public void setHpNo(String hpNo) {
        this.hpNo = hpNo;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public String getValidationYn() {
        return validationYn;
    }

    public void setValidationYn(String validationYn) {
        this.validationYn = validationYn;
    }

    public String getSysYn() {
        return sysYn;
    }

    public void setSysYn(String sysYn) {
        this.sysYn = sysYn;
    }

    public String getCallDefaultUrl() {
        return callDefaultUrl;
    }

    public void setCallDefaultUrl(String callDefaultUrl) {
        this.callDefaultUrl = callDefaultUrl;
    }

    public int getCallProgramId() {
        return callProgramId;
    }

    public void setCallProgramId(int callProgramId) {
        this.callProgramId = callProgramId;
    }

    public int getWebProgramId() {
        return webProgramId;
    }

    public void setWebProgramId(int webProgramId) {
        this.webProgramId = webProgramId;
    }

    public int getHomeProgramId() {
        return homeProgramId;
    }

    public void setHomeProgramId(int homeProgramId) {
        this.homeProgramId = homeProgramId;
    }

    public String getPwdChangeYn() {
        return pwdChangeYn;
    }

    public void setPwdChangeYn(String pwdChangeYn) {
        this.pwdChangeYn = pwdChangeYn;
    }

    public String getPwdChangeDt() {
        return pwdChangeDt;
    }

    public void setPwdChangeDt(String pwdChangeDt) {
        this.pwdChangeDt = pwdChangeDt;
    }

    public String getAdminYn() {
        return adminYn;
    }

    public void setAdminYn(String adminYn) {
        this.adminYn = adminYn;
    }

    public String getAuthYn() {
        return authYn;
    }

    public void setAuthYn(String authYn) {
        this.authYn = authYn;
    }

    public String getDeptNm() {
        return deptNm;
    }

    public void setDeptNm(String deptNm) {
        this.deptNm = deptNm;
    }

    public String getLastLoginDt() {
        return lastLoginDt;
    }

    public void setLastLoginDt(String lastLoginDt) {
        this.lastLoginDt = lastLoginDt;
    }

    public String getCtiYn() {
        return ctiYn;
    }

    public void setCtiYn(String ctiYn) {
        this.ctiYn = ctiYn;
    }

    public String getCtiId() {
        return ctiId;
    }

    public void setCtiId(String ctiId) {
        this.ctiId = ctiId;
    }

    public String getCtiPwd() {
        return ctiPwd;
    }

    public void setCtiPwd(String ctiPwd) {
        this.ctiPwd = ctiPwd;
    }

    public String getCtiStation() {
        return ctiStation;
    }

    public void setCtiStation(String ctiStation) {
        this.ctiStation = ctiStation;
    }

    public String getConnectIp() {
        return connectIp;
    }

    public void setConnectIp(String connectIp) {
        this.connectIp = connectIp;
    }

    public void setIsEnabled(boolean is){
        this.isEnabled = is;
    }
}
