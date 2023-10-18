package com.cp.praha.work.employee.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = EmployeeDeptSyncProc.PROC_NAME,
        procedureName = EmployeeDeptSyncProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class EmployeeDeptSyncProc {
    public final static String PROC_NAME = "USP_EMPLOYEE_DEPT_SYNC";
    @Id
    private int no;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, UserInfo userInfo) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_RGTR_ID",userInfo.getUser().getUserId());
        procedureQuery.execute();
        return procedureQuery;
    }
}
