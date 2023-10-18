package com.cp.praha.consult.consultmain.entity;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultmain.service.request.CustWarningInsCommand;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = CustWarningInsProc.PROC_NAME,
        procedureName = CustWarningInsProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_CUST_ID", type = Integer.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_UNITED_CUST_ID", type = Integer.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_BOUND_ID", type = Integer.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_CALL_ID", type = Integer.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_BOUND_TEL_NO", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_WARNING_TYPE", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_REQUEST_YMD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_REQUEST_REASON", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "O_CUST_WARNING_ID", type = Integer.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT)
        }
)
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CustWarningInsProc {

    public static final String PROC_NAME = "USP_CUST_WARNING_INS";

    @Id
    private String insertId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, CustWarningInsCommand command) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        command.setStoredProcedureParameters(query);
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}