package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.ReportBoundTypeCommand;
import com.cp.praha.report.service.response.ReportBoundTypeDomain;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = ReportBoundTypeProc.PROC_NAME,
        procedureName = ReportBoundTypeProc.PROC_NAME,
        resultClasses = ReportBoundTypeDomain.class,
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
public class ReportBoundTypeProc {

    public static final String PROC_NAME = "USP_REPORT_BOUND_TYPE";

    @Id
    private String no;


    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ReportBoundTypeCommand command) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        query.setParameter("V_START_DATE", command.getStartDate());
        query.setParameter("V_END_DATE", command.getEndDate());
        query.setParameter("V_SEARCH_TYPE", command.getSearchType());
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}
