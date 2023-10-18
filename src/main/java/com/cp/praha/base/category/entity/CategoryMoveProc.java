package com.cp.praha.base.category.entity;

import com.cp.praha.base.category.service.request.CategoryMoveCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.category.entity.CategoryMoveProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OBJECT_CAT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TARGET_CAT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MOVE_TYPE", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class CategoryMoveProc {
    public static final String PROC_NAME = "USP_CAT_MOV";

    @Id
    private String ids;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,CategoryMoveCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_OBJECT_CAT_ID", Integer.parseInt(command.getObjectCatId()));
        procedureQuery.setParameter("V_TARGET_CAT_ID", Integer.parseInt(command.getTargetCatId()));
        procedureQuery.setParameter("V_MOVE_TYPE", 0);
        procedureQuery.setParameter("V_MDFR_ID",command.getMdfrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
