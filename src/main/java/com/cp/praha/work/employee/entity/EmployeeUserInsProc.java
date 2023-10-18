package com.cp.praha.work.employee.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.employee.service.response.EmployeeUserVO;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = EmployeeUserInsProc.PROC_NAME,
        procedureName = EmployeeUserInsProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_UPLOAD_NO", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TEAM_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DUTY_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_POSITION_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_HP_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_JOB", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ORDER", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_STAT", type = String.class, mode = ParameterMode.IN
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
public class EmployeeUserInsProc {
    public final static String PROC_NAME = "USP_EMPLOYEE_USER_INS";
    @Id
    private int no;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, Integer no, UserInfo userInfo, EmployeeUserVO command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_UPLOAD_NO",no);
        procedureQuery.setParameter("V_USER_CD",command.getUserId());
        procedureQuery.setParameter("V_USER_NO","");
        procedureQuery.setParameter("V_USER_NM",command.getUserName());
        procedureQuery.setParameter("V_DEPT_CD",command.getDeptId());
        procedureQuery.setParameter("V_DEPT_NM",command.getDeptName());
        procedureQuery.setParameter("V_TEAM_NM","");
        procedureQuery.setParameter("V_DUTY_NM","");
        procedureQuery.setParameter("V_POSITION_NM",command.getPositionName());
        procedureQuery.setParameter("V_TEL_NO",command.getTel());
        procedureQuery.setParameter("V_HP_NO",command.getMobileTel());
        procedureQuery.setParameter("V_JOB",command.getUserWork());
        procedureQuery.setParameter("V_USER_ORDER",command.getSeq());
        procedureQuery.setParameter("V_USER_STAT",command.getUserStatName());
        procedureQuery.setParameter("V_RGTR_ID",userInfo.getUser().getUserId());
        procedureQuery.execute();
        return procedureQuery;
    }
}
