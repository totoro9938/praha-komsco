package com.cp.praha.knowledge.manualqna.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualqna.service.request.ManualSelectQnaCommand;
import com.cp.praha.knowledge.manualqna.service.response.ManualSelectQnaDomain;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualSelectQnaProc.PROC_NAME,
        procedureName = ManualSelectQnaProc.PROC_NAME,
        resultClasses = ManualSelectQnaDomain.class,
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
public class ManualSelectQnaProc {
    public static final String PROC_NAME = "USP_MANUAL_SEL_QNA";

    @Id
    private Integer manualId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ManualSelectQnaCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_ID", command.getManualId());
        procedureQuery.setParameter("V_OUTPUT_YN", command.getOutputYn());
        procedureQuery.execute();

        return procedureQuery;
    }

}
