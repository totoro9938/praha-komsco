package com.cp.praha.consult.consultmain.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultmain.service.request.CustomerCallTabSelectCommand;
import com.cp.praha.consult.consultmain.service.response.CustomerCallTabSelectDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
    name = CustomerCallTabSelectProc.PROC_NAME,
    procedureName = CustomerCallTabSelectProc.PROC_NAME,
    resultClasses = CustomerCallTabSelectDomain.class,
    parameters = {
        @StoredProcedureParameter(
            name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_CUST_ID", type = Integer.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_TEL_NO", type = String.class, mode = ParameterMode.IN
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
public class CustomerCallTabSelectProc {
    public static final String PROC_NAME = "USP_CALLTAB_CNT";

    @Id
    private int reservationCnt;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , CustomerCallTabSelectCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_CUST_ID", command.getCustId());
        procedureQuery.setParameter("V_TEL_NO", command.getTelNo());
        procedureQuery.execute();

        return procedureQuery;
    }
}
