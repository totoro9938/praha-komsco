package com.cp.praha.main.login.entity;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.login.service.request.LogLogoutInsCommand;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = LogLogoutInsProc.PROC_NAME,
        procedureName = LogLogoutInsProc.PROC_NAME,
        resultClasses = LogLogoutInsProc.class,
        parameters = {
                @StoredProcedureParameter(name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_IP", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT)
        }
)
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LogLogoutInsProc {

    public static final String PROC_NAME = "USP_LOG_LOGOUT_INS";

    @Id
    private String insertId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, LogLogoutInsCommand command) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        command.setStoredProcedureParameters(query);
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}
