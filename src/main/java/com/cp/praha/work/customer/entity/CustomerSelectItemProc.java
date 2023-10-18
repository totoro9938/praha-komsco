package com.cp.praha.work.customer.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.customer.service.response.CustomerSelectItemDomain;
import lombok.*;

import javax.persistence.*;

import static com.cp.praha.work.customer.entity.CustomerSelectItemProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = CustomerSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_UUID", type = String.class, mode = ParameterMode.IN
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
public class CustomerSelectItemProc {
    public static final String PROC_NAME = "USP_CUST_SEL_ITEM";

    @Id
    private Integer custId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      String uuid) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_CUST_UUID", uuid);
        procedureQuery.execute();

        return procedureQuery;
    }
}
