package com.cp.praha.main.login.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.login.service.request.UserLoginCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

import static com.cp.praha.main.login.entity.UserLoginProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = UserLoginProc.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_PWD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_URL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class UserLoginProc implements Serializable {
    private static final long serialVersionUID = 1L;
    public static final String PROC_NAME = "USP_USER_LOGIN";

    @Id
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
    private String otpUseYn;
    private String secretKey;
    private String email;

    public SessionEntity toSessionEntity() {
        return SessionEntityBuilder.aSessionEntity()
                .withUserId(userId)
                .withUserId(userId)
                .withUserCd(userCd)
                .withUserPwd(userPwd)
                .withUserNm(userNm)
                .withLoginYn(loginYn)
                .withGroupUid(groupUid)
                .withDescription(description)
                .withDeptId(deptId)
                .withTopDeptId(topDeptId)
                .withDuty(duty)
                .withEnterYmd(enterYmd)
                .withRetireYmd(retireYmd)
                .withTelNo(telNo)
                .withHpNo(hpNo)
                .withUseYn(useYn)
                .withValidationYn(validationYn)
                .withSysYn(sysYn)
                .withCallDefaultUrl(callDefaultUrl)
                .withCallProgramId(callProgramId)
                .withWebProgramId(webProgramId)
                .withHomeProgramId(homeProgramId)
                .withPwdChangeYn(pwdChangeYn)
                .withPwdChangeDt(pwdChangeDt)
                .withAdminYn(adminYn)
                .withAuthYn(authYn)
                .withDeptNm(deptNm)
                .withLastLoginDt(lastLoginDt)
                .withCtiPwd(ctiPwd)
                .build();
    }


    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, UserLoginCommand command) {


        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_USER_CD", command.getUserCd());
        procedureQuery.setParameter("V_USER_PWD", command.getUserPwd());
        procedureQuery.setParameter("V_IP", command.getIp());

        procedureQuery.execute();

        return procedureQuery;
    }
}
