package com.cp.praha.work.smstemaplate.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultmain.service.response.SmsTemplateSelectDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static com.cp.praha.work.smstemaplate.entity.SmsTemplateSelectItemProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = SmsTemplateSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_UUID", type = String.class, mode = ParameterMode.IN
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
public class SmsTemplateSelectItemProc {
    public final static String PROC_NAME = "USP_SMS_TEMPLATE_SEL_ITEM";
    @Id
    private int id;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      String smsTemplateUuid) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_SMS_TEMPLATE_UUID", smsTemplateUuid);
        procedureQuery.execute();

        return procedureQuery;
    }
}
