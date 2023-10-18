package com.cp.praha.knowledge.manualrequest.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestRejectCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualRequestRejectProc.PROC_NAME,
        procedureName = ManualRequestRejectProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REJECT_REASON", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ManualRequestRejectProc {
    public static final String PROC_NAME = "USP_MANUAL_REQUEST_REJECT";

    @Id
    private Integer requestManualId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, ManualRequestRejectCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_REQUEST_MANUAL_ID", command.getRequestManualId());
        procedureQuery.setParameter("V_REJECT_REASON", command.getRejectReason());
        procedureQuery.setParameter("V_USER_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
