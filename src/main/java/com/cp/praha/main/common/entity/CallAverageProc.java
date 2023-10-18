package com.cp.praha.main.common.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.common.service.response.CallAverageDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.main.common.entity.CallAverageProc.PROC_NAME;

@NamedStoredProcedureQuery(
    name =PROC_NAME,
    procedureName = PROC_NAME,
    resultClasses = CallAverageDomain.class,
    parameters = {
        @StoredProcedureParameter(
            name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
        ),
        @StoredProcedureParameter(
            name = "V_DAYCOUNT", type = Integer.class, mode = ParameterMode.IN
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
public class CallAverageProc {

    public static final String PROC_NAME = "USP_CALL_AVERAGE";
    @Id
    private String regYmd;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int daycount, int userId) {

        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_DAYCOUNT", daycount);
        procedureQuery.setParameter("V_USER_ID", userId);
        procedureQuery.execute();

        return procedureQuery;
    }
}
