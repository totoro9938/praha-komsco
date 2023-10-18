package com.cp.praha.consult.consultlist.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultlist.service.response.CallCallCatSelectDomain;
import com.cp.praha.consult.consultmain.service.request.CallCallCatCommand;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = CallCallCatSelectProc.PROC_NAME,
        procedureName = CallCallCatSelectProc.PROC_NAME,
        resultClasses = CallCallCatSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_ID", type = Integer.class, mode = ParameterMode.IN
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
public class CallCallCatSelectProc {
    public final static String PROC_NAME = "USP_CALL_CALL_CAT_SEL";
    @Id
    private int callId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , CallCallCatCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_BOUND_ID",command.getBoundId());
        procedureQuery.setParameter("V_CALL_ID", command.getCallId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
