package com.cp.praha.board.resourceboard.entity;

import com.cp.praha.board.resourceboard.service.response.EventBoardSelectItemDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = EventBoardSelectItemProc.PROC_NAME,
        procedureName = EventBoardSelectItemProc.PROC_NAME,
        resultClasses = EventBoardSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_EVENT_UUID", type = String.class, mode = ParameterMode.IN
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
public class EventBoardSelectItemProc {

    public static final String PROC_NAME = "USP_EVENT_SEL_ITEM";

    @Id
    private String id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      String eventUuid){
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_EVENT_UUID", eventUuid);
        procedureQuery.execute();
        return procedureQuery;
    }
}
