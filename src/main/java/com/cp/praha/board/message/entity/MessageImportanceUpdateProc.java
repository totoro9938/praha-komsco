package com.cp.praha.board.message.entity;

import com.cp.praha.board.message.service.request.MessageImportanceCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = MessageImportanceUpdateProc.PROC_NAME,
        procedureName = MessageImportanceUpdateProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_ID", type = Integer.class, mode = ParameterMode.IN
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
public class MessageImportanceUpdateProc {
    public static final String PROC_NAME = "USP_MESSAGE_IMPORTANCE_UPT";

    @Id
    private Integer messageId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      MessageImportanceCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_MESSAGE_ID", command.getMessageId());
        procedureQuery.setParameter("V_IMPORTANCE", command.getImportance());
        procedureQuery.execute();

        return procedureQuery;
    }
}
