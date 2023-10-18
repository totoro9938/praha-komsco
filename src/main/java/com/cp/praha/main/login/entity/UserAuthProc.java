package com.cp.praha.main.login.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.login.service.request.UserAuthCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

import static com.cp.praha.main.login.entity.UserAuthProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = UserAuthProc.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
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
public class UserAuthProc implements Serializable {
    private static final long serialVersionUID = 1L;
    public static final String PROC_NAME = "USP_ROLE_AUTH_SEL";

    @Id
    private String grantRoleNm;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, UserAuthCommand command) {

        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_USER_ID", command.getUserId());

        procedureQuery.execute();

        return procedureQuery;
    }
}
