package com.cp.praha.board.message.entity;

import com.cp.praha.board.message.service.request.MessageDeleteCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = MessageDeleteProc.PROC_NAME,
        procedureName = MessageDeleteProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_CNT", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_ID_LIST", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
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
public class MessageDeleteProc {
    public static final String PROC_NAME = "USP_MESSAGE_DEL";

    @Id
    private Integer userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      MessageDeleteCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_TYPE", command.getType());
        procedureQuery.setParameter("V_MESSAGE_CNT", command.getMessageCnt());
        procedureQuery.setParameter("V_MESSAGE_ID_LIST", command.getMessageIdList());
        procedureQuery.setParameter("V_USER_ID", command.getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
