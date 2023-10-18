package com.cp.praha.main.common.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.common.service.response.CallJobDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = CallJobProc.PROC_NAME,
        procedureName =  CallJobProc.PROC_NAME,
        resultClasses = CallJobDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SORT_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTPUT_YN", type = String.class, mode = ParameterMode.IN
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
public class CallJobProc {

    public static final String PROC_NAME = "USP_CALL_JOB";
    @Id
    private String codeIdx;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId) {

        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_USER_ID", userId);
        procedureQuery.setParameter("V_SORT_TYPE", "");
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.execute();

        procedureQuery.execute();

        return procedureQuery;
    }
}
