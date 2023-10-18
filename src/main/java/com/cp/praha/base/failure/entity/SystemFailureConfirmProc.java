package com.cp.praha.base.failure.entity;

import com.cp.praha.base.failure.service.request.SystemFailureConfirmCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.failure.entity.SystemFailureConfirmProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYSTEM_FAILURE_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONFIRM_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                ),

        }
)

@Getter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SystemFailureConfirmProc {
    public static final String PROC_NAME = "USP_SYSTEM_FAILURE_CONFIRM";

    @Id
    private String systemFailureUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, SystemFailureConfirmCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_SYSTEM_FAILURE_UUID",command.getSystemFailureUuid());
        procedureQuery.setParameter("V_CONFIRM_ID", command.getConfirmId() );
        procedureQuery.execute();

        return procedureQuery;
    }
}
