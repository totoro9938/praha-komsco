package com.cp.praha.knowledge.manualworker.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerDeleteCommand;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualWorkerDeleteProc.PROC_NAME,
        procedureName = ManualWorkerDeleteProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_WORKER_UUID", type = String.class, mode = ParameterMode.IN
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
@Entity
@NoArgsConstructor
public class ManualWorkerDeleteProc {
    public static final String PROC_NAME = "USP_MANUAL_WORKER_DEL";

    @Id
    private String manualWorkerUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entity, ManualWorkerDeleteCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entity, PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_WORKER_UUID", command.getManualWorkerUuid());
        procedureQuery.setParameter("V_MDFR_ID", command.getMdfrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}