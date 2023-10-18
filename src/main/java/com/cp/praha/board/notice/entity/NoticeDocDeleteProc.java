package com.cp.praha.board.notice.entity;

import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = NoticeDocDeleteProc.PROC_NAME,
        procedureName = NoticeDocDeleteProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DOC_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class NoticeDocDeleteProc {
    public static final String PROC_NAME = "USP_DOC_DEL";

    @Id
    private Integer docId;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      int docId, int userId) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_DOC_ID", docId);
        procedureQuery.setParameter("V_MDFR_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
