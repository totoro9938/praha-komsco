package com.cp.praha.board.message.entity;

import com.cp.praha.board.message.service.response.MessageGroupSelectDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = MessageGroupSelectProc.PROC_NAME,
        procedureName = MessageGroupSelectProc.PROC_NAME,
        resultClasses = MessageGroupSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
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
public class MessageGroupSelectProc {
    public static final String PROC_NAME = "USP_MESSAGE_GROUP_SEL";

    @Id
    private Integer userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_USER_ID", userId);
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.execute();

        return procedureQuery;
    }
}
