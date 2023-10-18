package com.cp.praha.board.message.entity;

import com.cp.praha.board.message.service.request.MessageInsertCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;
import java.util.UUID;

@NamedStoredProcedureQuery(
        name = MessageInsertProc.PROC_NAME,
        procedureName = MessageInsertProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONTENTS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RECEIVER_CNT", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_RECEIVER_ID_LIST", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_RECEIVER_NM_LIST", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_MESSAGE_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class MessageInsertProc {
    public static final String PROC_NAME = "USP_MESSAGE_INS";

    @Id
    private Integer messageUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      MessageInsertCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_MESSAGE_UUID", UUID.randomUUID().toString());
        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_CONTENTS", command.getContents());
        procedureQuery.setParameter("V_RECEIVER_CNT", command.getReceiverCnt());
        procedureQuery.setParameter("V_MESSAGE_RECEIVER_ID_LIST", command.getMessageReceiverIdList());
        procedureQuery.setParameter("V_MESSAGE_RECEIVER_NM_LIST", command.getMessageReceiverNmList());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_RGTR_ID", command.getRgtrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
