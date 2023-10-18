package com.cp.praha.knowledge.manualmanager.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualmanager.service.request.ManualHistorySelectItemCommand;
import com.cp.praha.knowledge.manualmanager.service.response.ManualHistorySelectItemDomain;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualHistorySelectItemProc.PROC_NAME,
        procedureName = ManualHistorySelectItemProc.PROC_NAME,
        resultClasses = ManualHistorySelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT", type = String.class, mode = ParameterMode.IN
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
public class ManualHistorySelectItemProc {
    public static final String PROC_NAME = "USP_MANUAL_HISTORY_SEL_ITEM";

    @Id
    private Integer manualId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ManualHistorySelectItemCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_MANUAL_IDX", command.getManualIdx());
        procedureQuery.setParameter("V_OUTPUT", "Y");

        return procedureQuery;
    }
}
