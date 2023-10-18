package com.cp.praha.knowledge.manualrelation.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationInsertCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualRelationInsertProc.PROC_NAME,
        procedureName = ManualRelationInsertProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RELATION_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class ManualRelationInsertProc {
    public static final String PROC_NAME = "USP_MANUAL_RELATION_INS";

    @Id
    private Integer manualId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, ManualRelationInsertCommand command, int manualRelationId) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_RELATION_MANUAL_ID", manualRelationId);
        procedureQuery.setParameter("V_RGTR_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
