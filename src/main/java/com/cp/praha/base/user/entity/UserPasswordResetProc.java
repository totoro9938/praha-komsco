package com.cp.praha.base.user.entity;

import com.cp.praha.base.user.service.request.UserPasswordResetCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

import static com.cp.praha.base.user.entity.UserPasswordResetProc.PROC_NAME;

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
                        name = "V_USER_PWD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class UserPasswordResetProc {
    public static final String PROC_NAME = "USP_USER_PWD_RESET";

    @Id
    private Integer userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,UserPasswordResetCommand userPasswordResetCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_USER_ID", userPasswordResetCommand.getUserId());
        procedureQuery.setParameter("V_USER_PWD", userPasswordResetCommand.getUserPwd());
        procedureQuery.setParameter("V_RGTR_ID", userPasswordResetCommand.getRgtrId());
        procedureQuery.setParameter("V_IP", userPasswordResetCommand.getIp());
        procedureQuery.execute();

        return procedureQuery;
    }
}
