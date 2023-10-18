package com.cp.praha.report.entity;


import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.ReportCallCatTypePivotCommand;
import com.cp.praha.report.service.response.ReportCallCatTypePivotDomain;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = ReportCallCatTypePivotProc.PROC_NAME,
        procedureName = ReportCallCatTypePivotProc.PROC_NAME,
        resultClasses = ReportCallCatTypePivotDomain.class,
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
public class ReportCallCatTypePivotProc {

    public static final String PROC_NAME = "USP_REPORT_CALL_CAT_TYPE_PIVOT";

    @Id
    private int itemIdx;



    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ReportCallCatTypePivotCommand command) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        query.setParameter("V_START_DATE", command.getStartDate());
        query.setParameter("V_END_DATE", command.getEndDate());
        query.setParameter("V_TERM_TYPE", command.getTermType());
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}