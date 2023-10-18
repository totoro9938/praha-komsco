package com.cp.praha.knowledge.manualmanager.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualmanager.service.request.ManualUpdateCommand;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualUpdateProc.PROC_NAME,
        procedureName = ManualUpdateProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IMPORTANCE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_FONT_COLOR", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_CAT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TITLE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CHARGE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONTENTS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_HTML", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_REASON", type = String.class, mode = ParameterMode.IN
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
public class ManualUpdateProc {
    public static final String PROC_NAME = "USP_MANUAL_UPT";

    @Id
    private Integer manualId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, ManualUpdateCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_MANUAL_TYPE", command.getManualType());
        procedureQuery.setParameter("V_IMPORTANCE", command.getImportance());
        procedureQuery.setParameter("V_FONT_COLOR", command.getFontColor());
        procedureQuery.setParameter("V_CALL_CAT_ID", command.getCallCatId());
        procedureQuery.setParameter("V_TITLE", command.getTitle());
        procedureQuery.setParameter("V_DEPT_ID", command.getDeptId());
        procedureQuery.setParameter("V_CHARGE_ID", command.getChargeId());
        procedureQuery.setParameter("V_TEL_NO", command.getTelNo());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_CONTENTS", command.getContents());
        procedureQuery.setParameter("V_HTML", command.getHtml());
        procedureQuery.setParameter("V_REQUEST_MANUAL_ID", command.getRequestManualId());
        procedureQuery.setParameter("V_START_DATE", command.getStartDate());
        procedureQuery.setParameter("V_END_DATE", command.getEndDate());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_REQUEST_REASON", command.getRequestReason());
        procedureQuery.setParameter("V_APPROVAL_YN", command.getApprovalYn());
        procedureQuery.setParameter("V_MDFR_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
