package com.cp.praha.knowledge.manualmanager.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualmanager.service.request.ManualDeleteCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualDeleteProc.PROC_NAME,
        procedureName = ManualDeleteProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_REASON", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_APPROVAL_YN", type = String.class, mode = ParameterMode.IN
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

@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ManualDeleteProc {
    public static final String PROC_NAME = "USP_MANUAL_DEL";

    @Id
    private Integer manualId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, ManualDeleteCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_MANUAL_TYPE", command.getManualType());
        procedureQuery.setParameter("V_REQUEST_REASON", command.getRequestReason());
        procedureQuery.setParameter("V_APPROVAL_YN", command.getApprovalYn());
        procedureQuery.setParameter("V_MDFR_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
