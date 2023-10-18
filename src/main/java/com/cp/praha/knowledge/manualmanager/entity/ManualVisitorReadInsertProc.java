package com.cp.praha.knowledge.manualmanager.entity;

import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualVisitorReadInsertProc.PROC_NAME,
        procedureName = ManualVisitorReadInsertProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MANUAL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_VISITOR_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class ManualVisitorReadInsertProc {
    public static final String PROC_NAME = "USP_VISITOR_MANUAL_READ_INS";

    @Id
    private Integer docId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, int manualId, String ip) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_MANUAL_ID", manualId);
        procedureQuery.setParameter("V_IP", ip);
        procedureQuery.setParameter("V_RGTR_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
