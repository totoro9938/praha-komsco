package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.ReportCallClassPerDayCommand;
import com.cp.praha.report.service.response.ReportCallClassPerDayDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ReportCallClassPerDayProc.PROC_NAME,
        procedureName = ReportCallClassPerDayProc.PROC_NAME,
        resultClasses = ReportCallClassPerDayDomain.class,
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
                        name = "V_CALL_CLASS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_CAT_ID", type = Integer.class, mode = ParameterMode.IN
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
public class ReportCallClassPerDayProc {
    public static final String PROC_NAME = "USP_REPORT_CALL_CLASS_PER_DAY";

    @Id
    private String id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ReportCallClassPerDayCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_START_DATE", command.getStartDate());
        procedureQuery.setParameter("V_END_DATE", command.getEndDate());
        procedureQuery.setParameter("V_CALL_CLASS", command.getCallClass());
        procedureQuery.setParameter("V_CALL_CAT_ID", command.getCallCatId());
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.setParameter("V_SORT_TYPE", command.getSortType());
        procedureQuery.execute();

        return procedureQuery;
    }
}
