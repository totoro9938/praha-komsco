package com.cp.praha.work.smstemaplate.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.smstemaplate.service.request.SmsTemplateInsertCommand;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

import static com.cp.praha.work.smstemaplate.entity.SmsTemplateInsertProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_CAT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_CONTENTS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class SmsTemplateInsertProc {
    public final static String PROC_NAME = "USP_SMS_TEMPLATE_INS";
    @Id
    private int id;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      SmsTemplateInsertCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_SMS_TEMPLATE_UUID", UUID.randomUUID().toString());
        procedureQuery.setParameter("V_SMS_TEMPLATE_IDX", command.getSmsTemplateIdx());
        procedureQuery.setParameter("V_SMS_TEMPLATE_NM", command.getSmsTemplateNm());
        procedureQuery.setParameter("V_SMS_TEMPLATE_CAT_ID", command.getSmsTemplateCatId());
        procedureQuery.setParameter("V_SMS_TEMPLATE_CONTENTS", command.getSmsTemplateContents());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_DEL_YN", command.getDelYn());
        procedureQuery.setParameter("V_RGTR_ID", command.getRgtrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
