package com.cp.praha.consult.callback.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.callback.service.response.CallbackOverlapSelecDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = CallbackOverlapSelecProc.PROC_NAME,
        procedureName = CallbackOverlapSelecProc.PROC_NAME,
        resultClasses = CallbackOverlapSelecDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALLBACK_ID", type = Integer.class, mode = ParameterMode.IN
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
public class CallbackOverlapSelecProc {
    public static final String PROC_NAME = "USP_CALLBACK_OVERLAP_SEL";

    @Id
    private String callbackId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,int callbackId) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_CALLBACK_ID", callbackId);

        return procedureQuery;
    }
}
