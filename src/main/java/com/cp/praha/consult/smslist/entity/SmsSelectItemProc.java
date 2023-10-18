package com.cp.praha.consult.smslist.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.smslist.service.response.SmsSelectItemDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = SmsSelectItemProc.PROC_NAME,
        procedureName = SmsSelectItemProc.PROC_NAME,
        resultClasses = SmsSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_UUID", type = String.class, mode = ParameterMode.IN
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
public class SmsSelectItemProc {
    public static final String PROC_NAME = "USP_SMS_SEL_ITEM";

    @Id
    private Integer smsUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , String uuid) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_SMS_UUID", uuid);
        procedureQuery.execute();

        return procedureQuery;
    }
}
