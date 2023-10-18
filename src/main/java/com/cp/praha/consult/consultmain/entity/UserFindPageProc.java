package com.cp.praha.consult.consultmain.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultmain.service.request.UserFindPageCommand;
import com.cp.praha.consult.consultmain.service.response.UserFindPageDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = UserFindPageProc.PROC_NAME,
        procedureName = UserFindPageProc.PROC_NAME,
        resultClasses = UserFindPageDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TXT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_USE_YN", type = String.class, mode = ParameterMode.IN
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
public class UserFindPageProc {
    public final static String PROC_NAME = "USP_USER_FIND_PAGE";
    @Id
    private int id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserFindPageCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_DEPT_ID",command.getDeptId());
        procedureQuery.setParameter("V_DESCRIPTION",command.getDescription());
        procedureQuery.setParameter("V_USER_NM",command.getUserNm());
        procedureQuery.setParameter("V_SEARCH_TYPE",command.getSearchType());
        procedureQuery.setParameter("V_SEARCH_TXT",command.getSearchTxt());
        procedureQuery.setParameter("V_USER_USE_YN",command.getUserUseYn());
        procedureQuery.setParameter("V_SORT_TYPE",command.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN","Y");
        procedureQuery.setParameter("V_PAGE",command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE",command.getTotalPage());
        procedureQuery.execute();

        return procedureQuery;
    }
}
