package com.cp.praha.base.category.entity;

import com.cp.praha.base.category.service.request.CategoryTreeCommand;
import com.cp.praha.base.category.service.response.CategoryTreeDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

import static com.cp.praha.base.category.entity.CategoryTreeProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = CategoryTreeDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_GROUP_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEL_YN", type = String.class, mode = ParameterMode.IN
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

@Getter
@Setter
@Entity

public class CategoryTreeProc {
    public static final String PROC_NAME = "USP_CAT_TREE";

    @Id
    private String id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, CategoryTreeCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_CAT_GROUP_CD",  command.getCatGroupCd());
        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_DEL_YN", command.getDelYn());
        procedureQuery.setParameter("V_OUTPUT_YN", command.getOutputYn());
        procedureQuery.setParameter("V_SORT_TYPE", command.getSortType());
        procedureQuery.execute();

        return procedureQuery;
    }
}
