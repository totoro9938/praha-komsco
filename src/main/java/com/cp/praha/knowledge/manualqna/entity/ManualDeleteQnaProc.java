package com.cp.praha.knowledge.manualqna.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualqna.service.request.ManualDeleteQnaCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualDeleteQnaProc.PROC_NAME,
        procedureName = ManualDeleteQnaProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEL_YN", type = String.class, mode = ParameterMode.IN
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
public class ManualDeleteQnaProc {
    public static final String PROC_NAME = "USP_MANUAL_QNA_DEL";

    @Id
    private Integer parentId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, ManualDeleteQnaCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_DEL_YN", "Y");
        procedureQuery.setParameter("V_APPROVAL_YN", "Y");
        procedureQuery.setParameter("V_MDFR_ID", userId);

        procedureQuery.execute();

        return procedureQuery;
    }
}
