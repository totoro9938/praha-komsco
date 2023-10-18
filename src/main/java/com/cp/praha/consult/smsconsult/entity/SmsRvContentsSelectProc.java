package com.cp.praha.consult.smsconsult.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.smsconsult.service.response.SmsRvContentsSelectDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = SmsRvContentsSelectProc.PROC_NAME,
        procedureName = SmsRvContentsSelectProc.PROC_NAME,
        resultClasses = SmsRvContentsSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_RV_ID", type = String.class, mode = ParameterMode.IN
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
public class SmsRvContentsSelectProc {
    public final static String PROC_NAME ="USP_SMS_RV_CONTENTS_SEL";
    @Id
    private int smsRvId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager ,String smsRvId) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_SMS_RV_ID", smsRvId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
