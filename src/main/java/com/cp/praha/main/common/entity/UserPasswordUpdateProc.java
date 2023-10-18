package com.cp.praha.main.common.entity;

import com.cp.praha.common.login.service.response.CpUserDetail;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.common.service.request.UserPasswordUpdateCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.main.common.entity.UserPasswordUpdateProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_PWD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_PWD_CHANGE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
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
public class UserPasswordUpdateProc {
    public static final String PROC_NAME = "USP_USER_PWD_UPT";
    @Id
    private Integer id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,UserPasswordUpdateCommand command, CpUserDetail user) {


        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_USER_ID", user.getUserId());
        procedureQuery.setParameter("V_USER_PWD", command.getUserPwd());
        procedureQuery.setParameter("V_USER_PWD_CHANGE", command.getUserPwdChange());
        procedureQuery.setParameter("V_IP", user.getConnectIp());

        procedureQuery.execute();

        return procedureQuery;
    }
}