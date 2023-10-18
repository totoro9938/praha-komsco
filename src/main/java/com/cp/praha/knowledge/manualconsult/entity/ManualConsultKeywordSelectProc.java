package com.cp.praha.knowledge.manualconsult.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.knowledge.manualconsult.service.request.ManualConsultKeywordSelectCommand;
import com.cp.praha.knowledge.manualconsult.service.response.ManualConsultKeywordSelectDomain;
import lombok.*;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ManualConsultKeywordSelectProc.PROC_NAME,
        procedureName = ManualConsultKeywordSelectProc.PROC_NAME,
        resultClasses = ManualConsultKeywordSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TOTALPAGE", type = Integer.class, mode = ParameterMode.IN
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
public class ManualConsultKeywordSelectProc {
    public static final String PROC_NAME = "USP_MANUAL_SEARCH_KEYWORD_SEL";

    @Id
    private Integer no;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ManualConsultKeywordSelectCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_TYPE", command.getType());
        procedureQuery.setParameter("V_OUTPUT_YN", command.getOutputYn());
        procedureQuery.setParameter("V_TOTALPAGE", command.getTotalPage());
        procedureQuery.execute();

        return procedureQuery;
    }
}
