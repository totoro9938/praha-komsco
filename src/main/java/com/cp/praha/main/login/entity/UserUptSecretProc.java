package com.cp.praha.main.login.entity;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.login.service.request.UserUptSecretCommand;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = UserUptSecretProc.PROC_NAME,
        procedureName = UserUptSecretProc.PROC_NAME,
        resultClasses = UserUptSecretProc.class,
        parameters = {
                @StoredProcedureParameter(name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_SECRET_KEY", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT)
        }
)
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class UserUptSecretProc {

    public static final String PROC_NAME = "USP_USER_UPT_SECRET";

    @Id
    private String insertId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, UserUptSecretCommand command) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        command.setStoredProcedureParameters(query);
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}
