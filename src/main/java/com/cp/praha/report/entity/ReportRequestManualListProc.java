package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.ReportRequestManualListCommand;
import com.cp.praha.report.service.response.ReportRequestManualListDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ReportRequestManualListProc.PROC_NAME,
        procedureName = ReportRequestManualListProc.PROC_NAME,
        resultClasses = ReportRequestManualListDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DATE", type = String.class, mode = ParameterMode.IN
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

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class ReportRequestManualListProc {
    public static final String PROC_NAME = "USP_REPORT_R_MANUAL_LST_PAGE";

    @Id
    private String id;


    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ReportRequestManualListCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_DEPT_ID", command.getDeptId());
        procedureQuery.setParameter("V_START_DATE", command.getStartDate());
        procedureQuery.setParameter("V_END_DATE", command.getEndDate());
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.execute();

        return procedureQuery;
    }
}
