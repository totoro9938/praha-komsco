package com.cp.praha.base.user.entity;

import com.cp.praha.base.user.service.request.UserUptCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

import static com.cp.praha.base.user.entity.UserUpdateProc.PROC_NAME;
@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_HP_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_EMAIL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DUTY", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_POSITION_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ENTER_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RETIRE_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CTI_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CTI_ID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CTI_PWD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CTI_STATION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GROUP_UID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
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

@Getter @Setter
@ToString @Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserUpdateProc {
    public static final String PROC_NAME = "USP_USER_UPT";

    @Id
    private Integer userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, UserUptCommand userUptCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_USER_ID", userUptCommand.getUserId());
        procedureQuery.setParameter("V_USER_CD", userUptCommand.getUserCd());
        procedureQuery.setParameter("V_USER_NM", userUptCommand.getUserNm());
        procedureQuery.setParameter("V_USER_IDX", userUptCommand.getUserIdx());
        procedureQuery.setParameter("V_TEL_NO", userUptCommand.getTelNo());
        procedureQuery.setParameter("V_HP_NO", userUptCommand.getHpNo());
        procedureQuery.setParameter("V_EMAIL", userUptCommand.getEmail());
        procedureQuery.setParameter("V_DEPT_ID", userUptCommand.getDeptId());
        procedureQuery.setParameter("V_DUTY", userUptCommand.getDuty());
        procedureQuery.setParameter("V_POSITION_NM", userUptCommand.getPositionNm());
        procedureQuery.setParameter("V_USE_YN", userUptCommand.getUseYn());
        procedureQuery.setParameter("V_DEL_YN", userUptCommand.getDelYn());
        procedureQuery.setParameter("V_ENTER_DT", userUptCommand.getEnterDt());
        procedureQuery.setParameter("V_RETIRE_DT", userUptCommand.getRetireDt());
        procedureQuery.setParameter("V_CTI_YN", userUptCommand.getCtiYn());
        procedureQuery.setParameter("V_CTI_ID", userUptCommand.getCtiId());
        procedureQuery.setParameter("V_CTI_PWD", userUptCommand.getCtiPwd());
        procedureQuery.setParameter("V_CTI_STATION", userUptCommand.getCtiStation());
        procedureQuery.setParameter("V_GROUP_UID", userUptCommand.getGroupUid());
        procedureQuery.setParameter("V_DESCRIPTION", userUptCommand.getDescription());
        procedureQuery.setParameter("V_MDFR_ID", userUptCommand.getMdfrId());
        procedureQuery.setParameter("V_IP", userUptCommand.getIp());
        procedureQuery.execute();

        return procedureQuery;
    }
}
