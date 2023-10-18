package com.cp.praha.consult.callback.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.callback.service.response.CallbackSelectItemDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = CallbackSelectItemProc.PROC_NAME,
        procedureName = CallbackSelectItemProc.PROC_NAME,
        resultClasses = CallbackSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALLBACK_UUID", type = String.class, mode = ParameterMode.IN
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
public class CallbackSelectItemProc {
    public static final String PROC_NAME = "USP_CALLBACK_SEL_ITEM";

    @Id
    private String callbackId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,String callbackUuid) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_CALLBACK_UUID", callbackUuid);
        return procedureQuery;
    }

}
