package com.cp.praha.work.customer.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.customer.service.request.CustomerIdUnitedCommand;
import lombok.*;

import javax.persistence.*;

import static com.cp.praha.work.customer.entity.CustomerIdUnitedProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_UNITED_CUST_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TARGET_CUST_ID", type = Integer.class, mode = ParameterMode.IN
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
public class CustomerIdUnitedProc {
    public static final String PROC_NAME = "USP_CUST_ID_UNITED";

    @Id
    private Integer unitedCustId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      CustomerIdUnitedCommand command,
                                                      int targetCustId) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_UNITED_CUST_ID", command.getUnitedCustId());
        procedureQuery.setParameter("V_TARGET_CUST_ID", targetCustId);
        procedureQuery.setParameter("V_MDFR_ID", command.getMdfrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
