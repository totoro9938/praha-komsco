package com.cp.praha.base.user.entity;

import com.cp.praha.base.user.service.request.UserUpdateIndexCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

import static com.cp.praha.base.user.entity.UserUpdateIndexProc.PROC_NAME;
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
                        name = "V_USER_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class UserUpdateIndexProc {
    public static final String PROC_NAME = "USP_USER_UPT_IDX";

    @Id
    private Integer userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,UserUpdateIndexCommand userUpdateIndexCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);


        procedureQuery.setParameter("V_USER_ID", userUpdateIndexCommand.getUserId());
        procedureQuery.setParameter("V_USER_IDX", userUpdateIndexCommand.getUserIdx());
        procedureQuery.setParameter("V_MDFR_ID", userUpdateIndexCommand.getMdfrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
