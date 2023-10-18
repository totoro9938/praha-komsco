package com.cp.praha.base.department.entity;

import com.cp.praha.base.department.service.request.DepartmentMoveCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.department.entity.DepartmentMoveProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OBJECT_DEPT_ID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TARGET_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MOVE_TYPE", type = Integer.class, mode = ParameterMode.IN
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
public class DepartmentMoveProc {
    public static final String PROC_NAME = "USP_DEPT_MOV";

    @Id
    private String deptId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,DepartmentMoveCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_OBJECT_DEPT_ID", command.getObjectDeptId());
        procedureQuery.setParameter("V_TARGET_DEPT_ID", command.getTargetDeptId());
        procedureQuery.setParameter("V_MOVE_TYPE", command.getMoveType());
        procedureQuery.execute();

        return procedureQuery;
    }
}
