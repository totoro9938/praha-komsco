package com.cp.praha.board.resourceboard.entity;

import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = EventBoardDeleteProc.PROC_NAME,
        procedureName = EventBoardDeleteProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_EVENT_ID", type = Integer.class, mode = ParameterMode.IN
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
public class EventBoardDeleteProc {

    public static final String PROC_NAME = "USP_EVENT_DEL";

    @Id
    private int id;

    public static StoredProcedureQuery procedureQuery (EntityManager entityManager,
                                                       int eventId, int userId){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_EVENT_ID",eventId);
        procedureQuery.setParameter("V_MDFR_ID", userId);
        procedureQuery.execute();
        return procedureQuery;
    }
}
