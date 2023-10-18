package com.cp.praha.work.customer.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.customer.service.request.CustomerUpdateCommand;
import lombok.*;

import javax.persistence.*;

import static com.cp.praha.work.customer.entity.CustomerUpdateProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BIRTH_DAY", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GENDER", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_HP_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PERSON_INFO_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_EMAIL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_EMAIL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SMS_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TEL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@Getter @Setter
@ToString @Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustomerUpdateProc {
    public static final String PROC_NAME = "USP_CUST_UPT";

    @Id
    private Integer custId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, CustomerUpdateCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_CUST_ID", command.getCustId());
        procedureQuery.setParameter("V_CUST_NM", command.getCustNm());
        procedureQuery.setParameter("V_BIRTH_DAY","");
        procedureQuery.setParameter("V_GENDER","");
        procedureQuery.setParameter("V_TEL_NO",command.getTelNo());
        procedureQuery.setParameter("V_HP_NO",command.getHpNo());
        procedureQuery.setParameter("V_BOUND_TEL_NO",command.getBoundTelNo());
        procedureQuery.setParameter("V_PERSON_INFO_USE_YN","N");
        procedureQuery.setParameter("V_EMAIL","");
        procedureQuery.setParameter("V_EMAIL_YN","N");
        procedureQuery.setParameter("V_SMS_YN",command.getSmsYn());
        procedureQuery.setParameter("V_TEL_YN",command.getTelYn());
        procedureQuery.setParameter("V_DESCRIPTION",command.getDescription());
        procedureQuery.setParameter("V_MDFR_ID", userInfo.getUser().getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
