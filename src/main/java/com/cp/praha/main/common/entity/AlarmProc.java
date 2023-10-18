package com.cp.praha.main.common.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.main.common.service.response.AlarmDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.main.common.entity.AlarmProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName =  PROC_NAME,
        resultClasses = AlarmDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_READ_YN", type = String.class, mode = ParameterMode.IN
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
public class AlarmProc {

    public static final String PROC_NAME = "USP_ALARM_SEL";
    @Id
    private int alarmId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, int userId,String readYn) {

        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_USER_ID", userId);
        procedureQuery.setParameter("V_READ_YN", readYn);
        procedureQuery.setParameter("V_SORT_TYPE", "");
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.execute();

        return procedureQuery;
    }
}
