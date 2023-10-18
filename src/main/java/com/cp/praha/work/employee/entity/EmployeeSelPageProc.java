package com.cp.praha.work.employee.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.employee.service.request.EmployeeSelPageCommand;
import com.cp.praha.work.employee.service.response.EmployeeSelPageDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = EmployeeSelPageProc.PROC_NAME,
        procedureName = EmployeeSelPageProc.PROC_NAME,
        resultClasses = EmployeeSelPageDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TXT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_STAT_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PAGE", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TOTALPAGE", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TOTALCOUNT", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "V_CUR_PAGE", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class EmployeeSelPageProc {
    public final static String PROC_NAME = "USP_EMPLOYEE_SEL_PAGE";
    @Id
    private int no;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, EmployeeSelPageCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_SEARCH_TYPE",command.getSearchType());
        procedureQuery.setParameter("V_SEARCH_TXT",command.getSearchTxt());
        procedureQuery.setParameter("V_STAT_NM",command.getStatNm());
        procedureQuery.setParameter("V_SORT_TYPE",command.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN",command.getOutputYn());
        procedureQuery.setParameter("V_PAGE",command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE",command.getTotalPage());
        procedureQuery.execute();
        return procedureQuery;
    }
}
