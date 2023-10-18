package com.cp.praha.consult.smsconsult.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.smsconsult.service.request.SmsSpamTelNoInsertCommand;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;
@NamedStoredProcedureQuery(
        name = SmsSpamTelInsertProc.PROC_NAME,
        procedureName = SmsSpamTelInsertProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SPAM_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SPAM_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_RV_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
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
public class SmsSpamTelInsertProc {
    public final static String PROC_NAME = "USP_SMS_SPAM_TELNO_INS";
    @Id
    private int uuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, SmsSpamTelNoInsertCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_SPAM_UUID", UUID.randomUUID().toString());
        procedureQuery.setParameter("V_SPAM_TEL_NO", command.getSpamTelNo());
        procedureQuery.setParameter("V_SMS_RV_ID", command.getSmsRvId());
        procedureQuery.setParameter("V_DESCRIPTION","");
        procedureQuery.setParameter("V_RGTR_ID", userInfo.getUser().getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
