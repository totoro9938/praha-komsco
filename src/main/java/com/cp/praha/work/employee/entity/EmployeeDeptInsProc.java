package com.cp.praha.work.employee.entity;


import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.employee.service.response.EmployeeDeptVO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = EmployeeDeptInsProc.PROC_NAME,
        procedureName = EmployeeDeptInsProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_UPLOAD_NO", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_FULL_DEPT_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_LVL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ORDER", type = String.class, mode = ParameterMode.IN
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
public class EmployeeDeptInsProc {
    public final static String PROC_NAME = "USP_EMPLOYEE_DEPT_INS";
    @Id
    private int no;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, Integer no, UserInfo userInfo, EmployeeDeptVO command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_UPLOAD_NO",no);
        procedureQuery.setParameter("V_DEPT_CD",command.getDeptId());
        procedureQuery.setParameter("V_DEPT_NM",command.getDeptName());
        procedureQuery.setParameter("V_PARENT_CD",command.getUpperDeptId());
        procedureQuery.setParameter("V_FULL_DEPT_NM","");
        procedureQuery.setParameter("V_DEPT_LVL",command.getDeptDepth());
        procedureQuery.setParameter("V_DEPT_ORDER",command.getDeptOrder());
        procedureQuery.setParameter("V_RGTR_ID",userInfo.getUser().getUserId());
        procedureQuery.execute();
        return procedureQuery;
    }
}
