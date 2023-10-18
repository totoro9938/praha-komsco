package com.cp.praha.knowledge.manualmanager.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualmanager.service.request.ManualUpdateBatchCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
    name = ManualUpdateBatchProc.PROC_NAME,
    procedureName = ManualUpdateBatchProc.PROC_NAME,
    parameters = {
        @StoredProcedureParameter(
            name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_CALL_CAT_ID", type = Integer.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_CHARGE_ID", type = Integer.class, mode = ParameterMode.IN
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
public class ManualUpdateBatchProc {
  public static final String PROC_NAME = "USP_MANUAL_UPT_DEPT";

  @Id
  private Integer manualId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, ManualUpdateBatchCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_CALL_CAT_ID", command.getCallCatId());
        procedureQuery.setParameter("V_DEPT_ID", command.getDeptId());
        procedureQuery.setParameter("V_CHARGE_ID", command.getChargeId());
        procedureQuery.setParameter("V_MDFR_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
