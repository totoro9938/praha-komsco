package com.cp.praha.consult.callback.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.callback.service.response.VisitorCallbackSelectDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = VisitorCallbackSelectProc.PROC_NAME,
        procedureName = VisitorCallbackSelectProc.PROC_NAME,
        resultClasses = VisitorCallbackSelectDomain.class,
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
public class VisitorCallbackSelectProc {
    public static final String PROC_NAME = "USP_VISITOR_CALLBACK_SEL";

    @Id
    private String callbackId;

    public static javax.persistence.StoredProcedureQuery procedureQuery(EntityManager entityManager , int callbackId) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_CALLBACK_ID", callbackId);

        return procedureQuery;
    }
}
