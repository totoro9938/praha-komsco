package com.cp.praha.consult.consultmain.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultmain.service.request.CallCallCatCommand;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;
@NamedStoredProcedureQuery(
        name = CallCallCatInsertProc.PROC_NAME,
        procedureName = CallCallCatInsertProc.PROC_NAME,
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
                        name = "V_CALL_CAT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_PART", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class CallCallCatInsertProc {
    public final static String PROC_NAME = "USP_CALL_CALL_CAT_INS";
    @Id
    private int callId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , CallCallCatCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_BOUND_ID",command.getBoundId());
        procedureQuery.setParameter("V_CALL_ID", command.getCallId());
        procedureQuery.setParameter("V_CALL_CAT_ID", command.getCatId());
        procedureQuery.setParameter("V_CALL_PART", command.getCallPart());
        procedureQuery.setParameter("V_RGTR_ID", command.getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
