package com.cp.praha.work.smsconfig.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.smsconfig.service.response.SmsSpamTelNoSelectItemDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static com.cp.praha.work.smsconfig.entity.SmsSpamTelNoSelectItemProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = SmsSpamTelNoSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SPAM_UUID", type = String.class, mode = ParameterMode.IN
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
public class SmsSpamTelNoSelectItemProc {
    public final static String PROC_NAME = "USP_SMS_SPAM_TELNO_SEL_ITEM";
    @Id
    private int uuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      String uuid) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_SPAM_UUID", uuid);
        procedureQuery.execute();

        return procedureQuery;
    }
}
