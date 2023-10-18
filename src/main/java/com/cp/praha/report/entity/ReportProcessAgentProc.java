package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.ReportProcessAgentCommand;
import com.cp.praha.report.service.response.ReportProcessAgentDomain;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = ReportProcessAgentProc.PROC_NAME,
        procedureName = ReportProcessAgentProc.PROC_NAME,
        resultClasses = ReportProcessAgentDomain.class,
        parameters = {
                @StoredProcedureParameter(name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_START_DATE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_END_DATE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT)
        }
)
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportProcessAgentProc {

    public static final String PROC_NAME = "USP_REPORT_PROCESS_AGENT";

    @Id
    private String userNm;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ReportProcessAgentCommand command) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        query.setParameter("V_START_DATE", command.getStartDate());
        query.setParameter("V_END_DATE", command.getEndDate());
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}
