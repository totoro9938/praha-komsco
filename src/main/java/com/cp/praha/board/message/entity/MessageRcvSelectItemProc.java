package com.cp.praha.board.message.entity;

import com.cp.praha.board.message.service.response.MessageRcvSelecItemtDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = MessageRcvSelectItemProc.PROC_NAME,
        procedureName = MessageRcvSelectItemProc.PROC_NAME,
        resultClasses = MessageRcvSelecItemtDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE_UUID", type = String.class, mode = ParameterMode.IN
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
public class MessageRcvSelectItemProc {
    public static final String PROC_NAME = "USP_MESSAGE_RCV_SEL_ITEM";

    @Id
    private Integer messageUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      String uuid) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_MESSAGE_UUID", uuid);
        procedureQuery.execute();

        return procedureQuery;
    }
}
