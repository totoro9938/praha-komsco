package com.cp.praha.knowledge.manualrequest.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestSelectItemCommand;
import com.cp.praha.knowledge.manualrequest.service.response.ManualRequestSelectItemDomain;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualRequestSelectItemProc.PROC_NAME,
        procedureName = ManualRequestSelectItemProc.PROC_NAME,
        resultClasses = ManualRequestSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_REQUEST_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
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
public class ManualRequestSelectItemProc {
    public static final String PROC_NAME = "USP_MANUAL_REQUEST_SEL_ITEM";

    @Id
    private Integer requestManualId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ManualRequestSelectItemCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_REQUEST_MANUAL_ID", command.getRequestManualId());
        procedureQuery.setParameter("V_OUTPUT_YN", command.getOutputYn());
        procedureQuery.execute();

        return procedureQuery;
    }
}
