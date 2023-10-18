package com.cp.praha.base.user.entity;

import com.cp.praha.base.user.service.request.UserInsertCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

import static com.cp.praha.base.user.entity.UserInsertProc.PROC_NAME;
@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_PWD", type = String.class, mode = ParameterMode.IN
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
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class UserInsertProc {
    public static final String PROC_NAME = "USP_USER_INS";

    @Id
    private Integer userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,UserInsertCommand userInsertCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_USER_UUID", userInsertCommand.getUserUuid());
        procedureQuery.setParameter("V_USER_CD", userInsertCommand.getUserCd());
        procedureQuery.setParameter("V_USER_PWD", userInsertCommand.getUserPwd());
        procedureQuery.setParameter("V_USER_NM", userInsertCommand.getUserNm());
        procedureQuery.setParameter("V_USER_IDX", userInsertCommand.getUserIdx());
        procedureQuery.setParameter("V_TEL_NO", userInsertCommand.getTelNo());
        procedureQuery.setParameter("V_HP_NO", userInsertCommand.getHpNo());
        procedureQuery.setParameter("V_EMAIL", userInsertCommand.getEmail());
        procedureQuery.setParameter("V_DEPT_ID", userInsertCommand.getDeptId());
        procedureQuery.setParameter("V_DUTY", userInsertCommand.getDuty());
        procedureQuery.setParameter("V_POSITION_NM", userInsertCommand.getPositionNm());
        procedureQuery.setParameter("V_USE_YN", userInsertCommand.getUseYn());
        procedureQuery.setParameter("V_ENTER_DT", userInsertCommand.getEnterDt());
        procedureQuery.setParameter("V_RETIRE_DT", userInsertCommand.getRetireDt());
        procedureQuery.setParameter("V_CTI_YN", userInsertCommand.getCtiYn());
        procedureQuery.setParameter("V_CTI_ID", userInsertCommand.getCtiId());
        procedureQuery.setParameter("V_CTI_PWD", userInsertCommand.getCtiPwd());
        procedureQuery.setParameter("V_CTI_STATION", userInsertCommand.getCtiStation());
        procedureQuery.setParameter("V_GROUP_UID", userInsertCommand.getGroupUid());
        procedureQuery.setParameter("V_DESCRIPTION", userInsertCommand.getDescription());
        procedureQuery.setParameter("V_RGTR_ID", userInsertCommand.getUserId());
        procedureQuery.setParameter("V_IP", userInsertCommand.getIp());
        procedureQuery.execute();

        return procedureQuery;
    }
}
