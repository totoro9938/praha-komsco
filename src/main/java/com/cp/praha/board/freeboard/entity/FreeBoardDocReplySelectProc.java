package com.cp.praha.board.freeboard.entity;

import com.cp.praha.board.freeboard.service.response.FreeBoardDocReplySelectDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = FreeBoardDocReplySelectProc.PROC_NAME,
        procedureName = FreeBoardDocReplySelectProc.PROC_NAME,
        resultClasses = FreeBoardDocReplySelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DOC_UUID", type = String.class, mode = ParameterMode.IN
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
public class FreeBoardDocReplySelectProc {
    public static final String PROC_NAME = "USP_DOC_REPLY_SEL";

    @Id
    private Integer docUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      String uuid) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_DOC_UUID", uuid);
        procedureQuery.execute();

        return procedureQuery;
    }
}
