package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.ReportManualCallPartCommand;
import com.cp.praha.report.service.response.ReportManualCallPartDomain;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = ReportManualCallPartProc.PROC_NAME,
        procedureName = ReportManualCallPartProc.PROC_NAME,
        resultClasses = ReportManualCallPartDomain.class,
        parameters = {
                @StoredProcedureParameter(name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_START_DATE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_END_DATE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_SEARCH_TYPE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT)
        }
)
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReportManualCallPartProc {

    public static final String PROC_NAME = "USP_REPORT_MANUAL_CALL_PART";

    @Id
    private String regYmd;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ReportManualCallPartCommand command) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        query.setParameter("V_START_DATE", command.getStartDate());
        query.setParameter("V_END_DATE", command.getEndDate());
        query.setParameter("V_SEARCH_TYPE", command.getSearchType());
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}