package com.cp.praha.main.common.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.common.service.request.CtiCallbackCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.util.UUID;

import static com.cp.praha.main.common.entity.CtiCallbackInserProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName =  PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALLBACK_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALLBACK_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_INBOUND_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALLBACK_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ROUTE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_CALLBACK_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class CtiCallbackInserProc {
    public static final String PROC_NAME = "USP_CALLBACK_INS";
    @Id
    private int callbackId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, CtiCallbackCommand command) {

        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_CALLBACK_UUID", UUID.randomUUID().toString());
        procedureQuery.setParameter("V_CALLBACK_DT", command.getCALLBACK_DT());
        procedureQuery.setParameter("V_INBOUND_TEL_NO", command.getINBOUND_TEL_NO());
        procedureQuery.setParameter("V_CALLBACK_TEL_NO", command.getCALLBACK_TEL_NO());
        procedureQuery.setParameter("V_ROUTE", command.getBOUND_ROOT());

        procedureQuery.execute();

        return procedureQuery;
    }
}
