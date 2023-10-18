package com.cp.praha.base.category.entity;

import com.cp.praha.base.category.service.response.CategoryMoveTreeSelectDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.category.entity.CategoryMoveTreeSelectProc.USP_CAT_MOV_TREE_SEL;


@NamedStoredProcedureQuery(
        name = USP_CAT_MOV_TREE_SEL,
        procedureName = USP_CAT_MOV_TREE_SEL,
        resultClasses = CategoryMoveTreeSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAT_GROUP_CD", type = String.class, mode = ParameterMode.IN
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
public class CategoryMoveTreeSelectProc {
    public static final String USP_CAT_MOV_TREE_SEL = "USP_CAT_MOV_TREE_SEL";

    @Id
    private String ids;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, String catGroupCd) {

        var procedureQuery = ProcedureQuery.get(entityManager, USP_CAT_MOV_TREE_SEL);

        procedureQuery.setParameter("V_CAT_GROUP_CD",  catGroupCd);
        procedureQuery.execute();

        return procedureQuery;
    }
}
