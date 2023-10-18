package com.cp.praha.board.message.entity;

import com.cp.praha.board.message.service.request.MessageGroupMemberSelectCommand;
import com.cp.praha.board.message.service.response.MessageGroupMemberSelectDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = MessageGroupMemberSelectProc.PROC_NAME,
        procedureName = MessageGroupMemberSelectProc.PROC_NAME,
        resultClasses = MessageGroupMemberSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_GROUP_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
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
public class MessageGroupMemberSelectProc {
    public static final String PROC_NAME = "USP_MESSAGE_GROUP_MEMBER_SEL";

    @Id
    private Integer deptId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      MessageGroupMemberSelectCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_MESSAGE_GROUP_ID", command.getMessageGroupId());
        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_DEPT_ID", command.getDeptId());
        procedureQuery.setParameter("V_USER_ID", command.getUserId());
        procedureQuery.setParameter("V_OUTPUT_YN", command.getOutputYn());
        procedureQuery.setParameter("V_SORT_TYPE", command.getSortType());
        procedureQuery.execute();

        return procedureQuery;
    }
}
