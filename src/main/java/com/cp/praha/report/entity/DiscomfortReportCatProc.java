package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.DiscomfortReportDeptCommand;
import com.cp.praha.report.service.response.DiscomfortReportCatDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = DiscomfortReportCatProc.PROC_NAME,
        procedureName = DiscomfortReportCatProc.PROC_NAME,
        resultClasses = DiscomfortReportCatDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROCESS_OFFICE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DISCOMFORT_WORK_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROCESS_CAT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
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
public class DiscomfortReportCatProc {
    public static final String PROC_NAME = "USP_DISCOMFORT_REPORT_CAT";

    @Id
    private String id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, DiscomfortReportDeptCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_START_DATE", command.getStartDate());
        procedureQuery.setParameter("V_END_DATE", command.getEndDate());
        procedureQuery.setParameter("V_PROCESS_OFFICE", command.getProcessOffice());
        procedureQuery.setParameter("V_DISCOMFORT_WORK_TYPE", command.getDiscomfortWorkType());
        procedureQuery.setParameter("V_PROCESS_CAT", command.getProcessCat());
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.setParameter("V_SORT_TYPE", command.getSortType());
        procedureQuery.execute();

        return procedureQuery;
    }
}
