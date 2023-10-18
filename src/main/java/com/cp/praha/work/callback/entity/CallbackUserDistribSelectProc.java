package com.cp.praha.work.callback.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.callback.service.request.CallbackUserDstribSelectCommand;
import com.cp.praha.work.callback.service.response.CallbackUserDstribSelectDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.callback.entity.CallbackUserDistribSelectProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = CallbackUserDstribSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
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
public class CallbackUserDistribSelectProc {
    public static final String PROC_NAME = "USP_CALLBACK_USER_DISTRIB_SEL";
    @Id
    private String callbackId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      CallbackUserDstribSelectCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_DEPT_ID", command.getDeptId());

        return procedureQuery;
    }
}
