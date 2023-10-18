package com.cp.praha.consult.consultmain.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultmain.service.response.SmsTemplateSelectDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = SmsTemplateSelectProc.PROC_NAME,
        procedureName = "USP_SMS_TEMPLATE_SEL",
        resultClasses = SmsTemplateSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_CAT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_NM", type = String.class, mode = ParameterMode.IN
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
public class SmsTemplateSelectProc {
    public final static String PROC_NAME = "USP_SMS_TEMPLATE_SEL";
    @Id
    private int id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , int templateId) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_SMS_TEMPLATE_CAT_ID", templateId);
        procedureQuery.setParameter("V_SMS_TEMPLATE_NM","");
        procedureQuery.execute();

        return procedureQuery;
    }
}
