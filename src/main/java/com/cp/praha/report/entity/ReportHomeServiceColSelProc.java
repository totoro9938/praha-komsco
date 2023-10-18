package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.ReportHomeServiceColSelCommand;
import com.cp.praha.report.service.response.ReportHomeServiceColSelDomain;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = ReportHomeServiceColSelProc.PROC_NAME,
        procedureName = ReportHomeServiceColSelProc.PROC_NAME,
        resultClasses = ReportHomeServiceColSelDomain.class,
        parameters = {
                @StoredProcedureParameter(name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_START_DATE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_END_DATE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_TERM_TYPE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT)
        }
)
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportHomeServiceColSelProc {

    public static final String PROC_NAME = "USP_REPORT_HOME_SERVICE_COL_SEL";

    @Id
    private String calYmd;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ReportHomeServiceColSelCommand command) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        query.setParameter("V_START_DATE", command.getStartDate());
        query.setParameter("V_END_DATE", command.getEndDate());
        query.setParameter("V_TERM_TYPE", command.getTermType());
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}