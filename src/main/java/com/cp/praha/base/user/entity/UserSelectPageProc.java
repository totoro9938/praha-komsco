package com.cp.praha.base.user.entity;

import com.cp.praha.base.user.service.request.UserSelectPageCommand;
import com.cp.praha.base.user.service.response.UserSelectPageDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;

import static com.cp.praha.base.user.entity.UserSelectPageProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = UserSelectPageDomain.class,
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
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GROUP_UID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CTI_YN", type = String.class, mode = ParameterMode.IN
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

@Getter @Setter
@ToString @Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserSelectPageProc {
    public static final String PROC_NAME = "USP_USER_SEL_PAGE";

    @Id
    private Integer userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,UserSelectPageCommand userSelectPageCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_PARENT_ID", userSelectPageCommand.getParentId());
        procedureQuery.setParameter("V_DEPT_ID", userSelectPageCommand.getDeptId());
        procedureQuery.setParameter("V_USER_ID", userSelectPageCommand.getUserId());
        procedureQuery.setParameter("V_USE_YN", userSelectPageCommand.getUseYn());
        procedureQuery.setParameter("V_GROUP_UID", userSelectPageCommand.getGroupUid());
        procedureQuery.setParameter("V_CTI_YN", userSelectPageCommand.getCtiYn());
        procedureQuery.setParameter("V_SEARCH_TYPE", userSelectPageCommand.getSearchType());
        procedureQuery.setParameter("V_SEARCH_TXT", userSelectPageCommand.getSearchTxt());
        procedureQuery.setParameter("V_SORT_TYPE", userSelectPageCommand.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN", userSelectPageCommand.getOutputYn());
        procedureQuery.setParameter("V_PAGE", userSelectPageCommand.getPage());
        procedureQuery.setParameter("V_TOTALPAGE", userSelectPageCommand.getTotalPage());
        procedureQuery.execute();

        return procedureQuery;
    }
}
