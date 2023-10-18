package com.cp.praha.knowledge.manualmanager.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectItemCommand;
import com.cp.praha.knowledge.manualmanager.service.response.ManualSelectItemDomain;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualSelectItemProc.PROC_NAME,
        procedureName = ManualSelectItemProc.PROC_NAME,
        resultClasses = ManualSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_UUID", type = String.class, mode = ParameterMode.IN
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
public class ManualSelectItemProc {
    public static final String PROC_NAME = "USP_MANUAL_SEL_ITEM";

    @Id
    private String manualUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ManualSelectItemCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_UUID", command.getManualUuid());
        procedureQuery.setParameter("V_OUTPUT_YN", command.getOutputYn());
        procedureQuery.execute();

        return procedureQuery;
    }
}
