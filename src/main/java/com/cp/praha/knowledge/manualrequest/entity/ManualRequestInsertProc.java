package com.cp.praha.knowledge.manualrequest.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestInsertCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualRequestInsertProc.PROC_NAME,
        procedureName = ManualRequestInsertProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CHARGE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_REASON_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_REASON", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_MANUAL_STATUS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_APPROVAL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_MANUAL_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class ManualRequestInsertProc {
    public static final String PROC_NAME = "USP_MANUAL_REQUEST_INS";

    @Id
    private Integer chargeId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, ManualRequestInsertCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_DEPT_ID", command.getDeptId());
        procedureQuery.setParameter("V_CHARGE_ID", command.getChargeId());
        procedureQuery.setParameter("V_REQUEST_REASON_TYPE", command.getRequestReasonType());
        procedureQuery.setParameter("V_REQUEST_REASON", command.getRequestReason());
        procedureQuery.setParameter("V_REQUEST_MANUAL_STATUS", command.getRequestManualStatus());
        procedureQuery.setParameter("V_APPROVAL_YN", command.getApprovalYn());
        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_RGTR_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
