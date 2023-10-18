package com.cp.praha.knowledge.manualmanager.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualmanager.service.request.ManualHistorySelectCommand;
import com.cp.praha.knowledge.manualmanager.service.response.ManualHistorySelectDomain;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualHistorySelectProc.PROC_NAME,
        procedureName = ManualHistorySelectProc.PROC_NAME,
        resultClasses = ManualHistorySelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
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
public class ManualHistorySelectProc {
    public static final String PROC_NAME = "USP_MANUAL_HISTORY_SEL";

    @Id
    private Integer manualId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ManualHistorySelectCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_OUTPUT_YN", command.getOutputYn());

        return procedureQuery;
    }
}
