package com.cp.praha.work.callback.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.callback.service.request.CallbackDistributionClearCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.callback.entity.CallbackDistributionClearProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALLBACK_ID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALLBACK_CNT", type = Integer.class, mode = ParameterMode.IN
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
@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class CallbackDistributionClearProc {
    public final static String PROC_NAME = "USP_CALLBACK_DISTRIB_CLEAR";

    @Id
    private int callbackId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      CallbackDistributionClearCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_CALLBACK_ID", command.getCallbackId());
        procedureQuery.setParameter("V_CALLBACK_CNT", command.getCallbackCnt());
        procedureQuery.setParameter("V_MDFR_ID", command.getMdfrId());

        return procedureQuery;
    }
}
