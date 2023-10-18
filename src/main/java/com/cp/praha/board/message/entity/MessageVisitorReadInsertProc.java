package com.cp.praha.board.message.entity;

import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = MessageVisitorReadInsertProc.PROC_NAME,
        procedureName = MessageVisitorReadInsertProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
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
public class MessageVisitorReadInsertProc {
    public static final String PROC_NAME = "USP_VISITOR_MESSAGE_READ_INS";

    @Id
    private Integer messageId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      String ip, int messageId, int userId) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_MESSAGE_ID", messageId);
        procedureQuery.setParameter("V_USER_ID", userId);
        procedureQuery.setParameter("V_IP", ip);
        procedureQuery.execute();

        return procedureQuery;
    }
}
