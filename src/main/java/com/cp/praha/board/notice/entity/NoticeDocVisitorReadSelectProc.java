package com.cp.praha.board.notice.entity;

import com.cp.praha.board.notice.service.response.NoticeDocVisitorReadSelectDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = NoticeDocVisitorReadSelectProc.PROC_NAME,
        procedureName = NoticeDocVisitorReadSelectProc.PROC_NAME,
        resultClasses = NoticeDocVisitorReadSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DOC_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
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
public class NoticeDocVisitorReadSelectProc {
    public static final String PROC_NAME = "USP_VISITOR_DOC_READ_SEL";

    @Id
    private Integer docId;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,int docId) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_DOC_ID", docId);
        procedureQuery.setParameter("V_SORT_TYPE", "");
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.execute();

        return procedureQuery;
    }
}
