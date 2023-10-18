package com.cp.praha.board.message.entity;

import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = MessageGroupDeleteProc.PROC_NAME,
        procedureName = MessageGroupDeleteProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_GROUP_ID", type = Integer.class, mode = ParameterMode.IN
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
public class MessageGroupDeleteProc {
    public static final String PROC_NAME = "USP_MESSAGE_GROUP_DEL";

    @Id
    private Integer messageGroupId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      int messageGroupId, int userId) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_USER_ID", userId);
        procedureQuery.setParameter("V_MESSAGE_GROUP_ID", messageGroupId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
