package com.cp.praha.knowledge.manualqna.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualqna.service.request.ManualInsertQnaCommand;
import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@NamedStoredProcedureQuery(
        name = ManualInsertQnaProc.PROC_NAME,
        procedureName = ManualInsertQnaProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IMPORTANCE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_FONT_COLOR", type = String.class, mode = ParameterMode.IN
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
                        name = "V_RTGT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class ManualInsertQnaProc {
    public static final String PROC_NAME = "USP_MANUAL_QNA_INS";

    @Id
    private Integer parentId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, ManualInsertQnaCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_UUID", UUID.randomUUID().toString());
        procedureQuery.setParameter("V_MANUAL_TYPE", command.getManualType());
        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_MANUAL_IDX", command.getManualIdx());
        procedureQuery.setParameter("V_IMPORTANCE", "");
        procedureQuery.setParameter("V_FONT_COLOR", "");
        procedureQuery.setParameter("V_TITLE", command.getTitle());
        procedureQuery.setParameter("V_CONTENTS", command.getContents());
        procedureQuery.setParameter("V_HTML", command.getHtml());
        procedureQuery.setParameter("V_USE_YN", "Y");
        procedureQuery.setParameter("V_APPROVAL_YN", "Y");
        procedureQuery.setParameter("V_RTGT_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
