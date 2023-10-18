package com.cp.praha.work.warncustomer.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.warncustomer.service.request.CustWarningSelPageCommand;
import com.cp.praha.work.warncustomer.service.response.CustWarningSelPageDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = CustWarningSelPageProc.PROC_NAME,
        procedureName = CustWarningSelPageProc.PROC_NAME,
        resultClasses = CustWarningSelPageDomain.class,
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
                        name = "V_WARNING_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROCESS_STATUS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TXT", type = String.class, mode = ParameterMode.IN
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
public class CustWarningSelPageProc {
    public final static String PROC_NAME = "USP_CUST_WARNING_SEL_PAGE";
    @Id
    private int uuid;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      CustWarningSelPageCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_START_DATE",command.getStartDate());
        procedureQuery.setParameter("V_END_DATE",command.getEndDate());
        procedureQuery.setParameter("V_WARNING_TYPE",command.getWarningType());
        procedureQuery.setParameter("V_PROCESS_STATUS",command.getProcessStatus());
        procedureQuery.setParameter("V_SEARCH_TYPE",command.getSearchType());
        procedureQuery.setParameter("V_SEARCH_TXT",command.getSearchTxt());
        procedureQuery.setParameter("V_SORT_TYPE",command.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN",command.getOutputYn());
        procedureQuery.setParameter("V_PAGE",command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE",command.getTotalPage());
        procedureQuery.execute();
        return procedureQuery;
    }
}
