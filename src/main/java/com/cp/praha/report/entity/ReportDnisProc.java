package com.cp.praha.report.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.report.service.request.ReportCallCatTypeCommand;
import com.cp.praha.report.service.response.ReportDnisDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = ReportDnisProc.PROC_NAME,
        procedureName = ReportDnisProc.PROC_NAME,
        resultClasses = ReportDnisDomain.class,
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
                        name = "V_TERM_TYPE", type = String.class, mode = ParameterMode.IN
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
public class ReportDnisProc {
    public static final String PROC_NAME = "USP_REPORT_DNIS";

    @Id
    private String id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ReportCallCatTypeCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);


        procedureQuery.setParameter("V_START_DATE", command.getStartDate());
        procedureQuery.setParameter("V_END_DATE", command.getEndDate());
        procedureQuery.setParameter("V_TERM_TYPE", command.getTermType());
        procedureQuery.execute();

        return procedureQuery;
    }
}
