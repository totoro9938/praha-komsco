package com.cp.praha.board.message.entity;

import com.cp.praha.board.message.service.request.MessageGroupSaveCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = MessageGroupSaveProc.PROC_NAME,
        procedureName = MessageGroupSaveProc.PROC_NAME,
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
                        name = "V_MESSAGE_GROUP_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_GROUP_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_GROUP_MEMBER_CNT", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_GROUP_MEMBER_ID_LIST", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_MESSAGE_GROUP_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class MessageGroupSaveProc {
    public static final String PROC_NAME = "USP_MESSAGE_GROUP_SAV";

    @Id
    private Integer userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      MessageGroupSaveCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_USER_ID", command.getUserId());
        procedureQuery.setParameter("V_MESSAGE_GROUP_ID", command.getMessageGroupId());
        procedureQuery.setParameter("V_MESSAGE_GROUP_IDX", 0);
        procedureQuery.setParameter("V_MESSAGE_GROUP_NM", command.getMessageGroupNm());
        procedureQuery.setParameter("V_MESSAGE_GROUP_MEMBER_CNT", command.getMessageGroupMemberCnt());
        procedureQuery.setParameter("V_MESSAGE_GROUP_MEMBER_ID_LIST", command.getMessageGroupMemberIdList());
        procedureQuery.execute();

        return procedureQuery;
    }
}
