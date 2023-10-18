package com.cp.praha.consult.boundlist.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.boundlist.service.request.BoundSelectPageCommand;
import com.cp.praha.consult.boundlist.service.response.BoundSelectPageDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
    name = BoundSelectPageProc.PROC_NAME,
    procedureName = "USP_BOUND_SEL_PAGE",
    resultClasses = BoundSelectPageDomain.class,
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
            name = "V_SEARCH_TYPE", type = String.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_SEARCH_TXT", type = String.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_BOUND_TYPE", type = String.class, mode = ParameterMode.IN
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

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class BoundSelectPageProc {
    public final static String PROC_NAME ="USP_BOUND_SEL_PAGE";
    @Id
    private int boundId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,BoundSelectPageCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_START_DATE", command.getStartDate());
        procedureQuery.setParameter("V_END_DATE", command.getEndDate());
        procedureQuery.setParameter("V_SEARCH_TYPE", command.getSearchType());
        procedureQuery.setParameter("V_SEARCH_TXT", command.getSearchTxt());
        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_DEPT_ID", command.getDeptId());
        procedureQuery.setParameter("V_USER_ID", command.getUserId());
        procedureQuery.setParameter("V_BOUND_TYPE", command.getBoundType());
        procedureQuery.setParameter("V_SORT_TYPE", command.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.setParameter("V_PAGE", command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE", command.getTotalPage());
        procedureQuery.execute();
        return procedureQuery;
    }
}
