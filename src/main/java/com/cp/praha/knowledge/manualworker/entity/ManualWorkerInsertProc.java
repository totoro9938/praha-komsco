package com.cp.praha.knowledge.manualworker.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerInsertCommand;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.UUID;

@NamedStoredProcedureQuery(
        name = ManualWorkerInsertProc.PROC_NAME,
        procedureName = ManualWorkerInsertProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_WORKER_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_WORKER_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_WORKER_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_WORKER_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class ManualWorkerInsertProc {
    public static final String PROC_NAME = "USP_MANUAL_WORKER_INS";

    @Id
    private String manualWorkerUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entity, int userId, ManualWorkerInsertCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entity, PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_WORKER_UUID", UUID.randomUUID().toString());
        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_WORKER_NM", command.getWorkerNm());
        procedureQuery.setParameter("V_WORKER_TEL_NO", command.getWorkerTelNo());
        procedureQuery.setParameter("V_RGTR_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}