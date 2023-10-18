package com.cp.praha.work.warncustomer.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.warncustomer.service.response.CustWarningSelItemDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = CustWarningSelItemProc.PROC_NAME,
        procedureName = CustWarningSelItemProc.PROC_NAME,
        resultClasses = CustWarningSelItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_WARNING_ID", type = Integer.class, mode = ParameterMode.IN
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
public class CustWarningSelItemProc {
    public final static String PROC_NAME = "USP_CUST_WARNING_SEL_ITEM";
    @Id
    private int uuid;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      int custWarningId) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_CUST_WARNING_ID",custWarningId);
        procedureQuery.execute();
        return procedureQuery;
    }
}
