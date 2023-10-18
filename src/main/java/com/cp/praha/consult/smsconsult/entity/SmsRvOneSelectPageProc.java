package com.cp.praha.consult.smsconsult.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.smsconsult.service.request.SmsRvOneSelectPageCommand;
import com.cp.praha.consult.smsconsult.service.response.SmsRvOneSelectPageDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = SmsRvOneSelectPageProc.PROC_NAME,
        procedureName = SmsRvOneSelectPageProc.PROC_NAME,
        resultClasses = SmsRvOneSelectPageDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_RV_STATUS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_KIND", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESULT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
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

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class SmsRvOneSelectPageProc {
    public final static String PROC_NAME ="USP_SMS_RV_ONE_SEL_PAGE";
    @Id
    private int smsRvId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , SmsRvOneSelectPageCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_START_DT", command.getStartDt());
        procedureQuery.setParameter("V_END_DT", command.getEndDt());
        procedureQuery.setParameter("V_TEL_NO", command.getTelNo());
        procedureQuery.setParameter("V_USER_ID", command.getUserId());
        procedureQuery.setParameter("V_SMS_RV_STATUS", command.getSmsRvStatus());
        procedureQuery.setParameter("V_SMS_KIND", command.getSmsKind());
        procedureQuery.setParameter("V_RESULT", command.getResult());
        procedureQuery.setParameter("V_SORT_TYPE", command.getSortType());
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.setParameter("V_PAGE", command.getPage());
        procedureQuery.setParameter("V_TOTALPAGE", command.getTotalpage());
        procedureQuery.execute();

        return procedureQuery;
    }
}
