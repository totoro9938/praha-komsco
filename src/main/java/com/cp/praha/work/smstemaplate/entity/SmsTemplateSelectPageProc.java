package com.cp.praha.work.smstemaplate.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.smstemaplate.service.request.SmsTemplateSelectPageCommand;
import com.cp.praha.work.smstemaplate.service.response.SmsTemplateSelectPageDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static com.cp.praha.work.smstemaplate.entity.SmsTemplateSelectPageProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = SmsTemplateSelectPageDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPLATE_CAT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PAGE", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TOTALPAGE", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TOTALCOUNT", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "V_CUR_PAGE", type = Integer.class, mode = ParameterMode.OUT
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
public class SmsTemplateSelectPageProc {
    public final static String PROC_NAME = "USP_SMS_TEMPLATE_SEL_PAGE";
    @Id
    private int id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      SmsTemplateSelectPageCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_SMS_TEMPLATE_CAT_ID", command.getSmsTemplateCatId());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_DEL_YN", command.getDelYn());
        procedureQuery.setParameter("V_SORT_TYPE", command.getSortType());
        procedureQuery.setParameter("V_PAGE", 1);
        procedureQuery.setParameter("V_TOTALPAGE", 10000);
        procedureQuery.execute();

        return procedureQuery;
    }
}
