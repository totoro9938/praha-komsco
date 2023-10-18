package com.cp.praha.knowledge.manualworker.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerSelectCommand;
import com.cp.praha.knowledge.manualworker.service.response.ManualWorkerSelectDomain;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualWorkerSelectProc.PROC_NAME,
        procedureName = ManualWorkerSelectProc.PROC_NAME,
        resultClasses = ManualWorkerSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
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
public class ManualWorkerSelectProc {
    public static final String PROC_NAME = "USP_MANUAL_WORKER_SEL";

    @Id
    private Integer manualWorkerId;

    public static StoredProcedureQuery procedureQuery(EntityManager entity, ManualWorkerSelectCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entity, PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
