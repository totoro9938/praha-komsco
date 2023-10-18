package com.cp.praha.work.smsconfig.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.smsconfig.service.response.UserAppointSelectDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static com.cp.praha.work.smsconfig.entity.UserAppointSelectProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = UserAppointSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_APPOINT_TYPE", type = String.class, mode = ParameterMode.IN
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
public class UserAppointSelectProc {
    public final static String PROC_NAME = "USP_USER_APPOINT_SEL";
    @Id
    private int userId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      int deptId) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_PARENT_ID", deptId);
        procedureQuery.setParameter("V_APPOINT_TYPE", "SmsCall");
        procedureQuery.execute();

        return procedureQuery;
    }
}
