package com.cp.praha.work.customer.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.customer.service.response.CustomerBlackSelectItemDomain;
import lombok.*;

import javax.persistence.*;

import static com.cp.praha.work.customer.entity.CustomerBlackSelectItemProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = CustomerBlackSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_BLACK_ID", type = Integer.class, mode = ParameterMode.IN
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
public class CustomerBlackSelectItemProc {
    public static final String PROC_NAME = "USP_CUST_BLACK_SEL_ITEM";

    @Id
    private Integer custBlackId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      int custBlackId) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_CUST_BLACK_ID", custBlackId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
