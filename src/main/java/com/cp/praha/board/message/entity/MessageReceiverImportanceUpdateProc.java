package com.cp.praha.board.message.entity;

import com.cp.praha.board.message.service.request.MessageRecevieImportanceCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = MessageReceiverImportanceUpdateProc.PROC_NAME,
        procedureName = MessageReceiverImportanceUpdateProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_RECEIVE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IMPORTANCE", type = String.class, mode = ParameterMode.IN
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
public class MessageReceiverImportanceUpdateProc {
    public static final String PROC_NAME = "USP_MESSAGE_RECEIVER_IMPORTANCE_UPT";

    @Id
    private Integer messageId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      MessageRecevieImportanceCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_MESSAGE_ID", command.getMessageId());
        procedureQuery.setParameter("V_MESSAGE_RECEIVE_ID", command.getMessageReceiveId());
        procedureQuery.setParameter("V_IMPORTANCE", command.getImportance());
        procedureQuery.execute();

        return procedureQuery;
    }
}
