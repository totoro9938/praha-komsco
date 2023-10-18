package com.cp.praha.consult.smsconsult.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.smsconsult.service.request.SmsRvSmsInserCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = SmsRvSmsInserProc.PROC_NAME,
        procedureName = SmsRvSmsInserProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_RV_MID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_RV_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TO_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_TEMPATE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_KIND", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MESSAGE", type = String.class, mode = ParameterMode.IN
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

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class SmsRvSmsInserProc {
    public final static String PROC_NAME ="USP_SMS_RV_SMS_INS";
    @Id
    private int smsId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, SmsRvSmsInserCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_SMS_RV_MID", command.getSmsRvMid());
        procedureQuery.setParameter("V_SMS_RV_ID", command.getSmsRvId());
        procedureQuery.setParameter("V_TO_TEL_NO", command.getToTelNo());
        procedureQuery.setParameter("V_SMS_TEMPATE_ID", command.getSmsTemplateId());
        procedureQuery.setParameter("V_SMS_KIND", "SmsCallRv");
        procedureQuery.setParameter("V_MESSAGE", command.getMessage());
        procedureQuery.setParameter("V_USER_ID", userInfo.getUser().getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
