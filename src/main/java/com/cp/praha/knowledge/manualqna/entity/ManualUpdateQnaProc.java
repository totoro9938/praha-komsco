package com.cp.praha.knowledge.manualqna.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualqna.service.request.ManualUpdateQnaCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualUpdateQnaProc.PROC_NAME,
        procedureName = ManualUpdateQnaProc.PROC_NAME,
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
                        name = "V_MANUAL_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TITLE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONTENTS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_HTML", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
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
public class ManualUpdateQnaProc {
    public static final String PROC_NAME = "USP_MANUAL_QNA_UPT";

    @Id
    private Integer parentId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, ManualUpdateQnaCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_MANUAL_IDX", command.getManualIdx());
        procedureQuery.setParameter("V_TITLE", command.getTitle());
        procedureQuery.setParameter("V_CONTENTS", command.getContents());
        procedureQuery.setParameter("V_HTML", command.getHtml());
        procedureQuery.setParameter("V_USE_YN", "Y");
        procedureQuery.setParameter("V_APPROVAL_YN", "Y");
        procedureQuery.setParameter("V_MDFR_ID", userId);

        procedureQuery.execute();

        return procedureQuery;
    }
}
