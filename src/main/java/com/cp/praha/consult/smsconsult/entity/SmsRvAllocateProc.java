package com.cp.praha.consult.smsconsult.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = SmsRvAllocateProc.PROC_NAME,
        procedureName = SmsRvAllocateProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_RV_ID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
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
public class SmsRvAllocateProc {
    public final static String PROC_NAME = "USP_SMS_RV_ALLOCATE";
    @Id
    private int smsRvMid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, String smsRvId) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_SMS_RV_ID", smsRvId);
        procedureQuery.setParameter("V_USER_ID", userInfo.getUser().getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
