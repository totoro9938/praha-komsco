package com.cp.praha.knowledge.manualconsult.entity;

import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = ManualKeywordCountProc.PROC_NAME,
        procedureName = ManualKeywordCountProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_KEYWORD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class ManualKeywordCountProc {
    public static final String PROC_NAME = "USP_MANUAL_KEYWORD_CNT";

    @Id
    private Integer no;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId, String keyword) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_SEARCH_KEYWORD", keyword);
        procedureQuery.setParameter("V_RGTR_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
