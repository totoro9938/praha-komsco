package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.ReportManualDeptCommand;
import com.cp.praha.report.service.response.ReportManualDeptDomain;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = ReportManualDeptProc.PROC_NAME,
        procedureName = ReportManualDeptProc.PROC_NAME,
        resultClasses = ReportManualDeptDomain.class,
        parameters = {
                @StoredProcedureParameter(name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_DEPT_TYPE", type = String.class, mode = ParameterMode.IN),
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
public class ReportManualDeptProc {

    public static final String PROC_NAME = "USP_REPORT_MANUAL_DEPT";

    @Id
    private String no;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ReportManualDeptCommand command) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        query.setParameter("V_DEPT_TYPE", command.getDeptType());
        query.setParameter("V_START_DATE", command.getStartDate());
        query.setParameter("V_END_DATE", command.getEndDate());
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}