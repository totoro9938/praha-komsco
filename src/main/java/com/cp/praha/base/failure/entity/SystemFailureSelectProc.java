package com.cp.praha.base.failure.entity;

import com.cp.praha.base.failure.service.request.SystemFailureSelectCommand;
import com.cp.praha.base.failure.service.response.SystemFailureSelectDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.failure.entity.SystemFailureSelectProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = SystemFailureSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYSTEM_FAILURE_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYSTEM_FAILURE_WORK_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SEARCH_TXT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )


        }
)

@Getter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SystemFailureSelectProc {
    public static final String PROC_NAME = "USP_SYSTEM_FAILURE_SEL";
    @Id
    private int systemFailureId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, SystemFailureSelectCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_START_DATE",command.getStartDate());
        procedureQuery.setParameter("V_END_DATE",command.getEndDate());
        procedureQuery.setParameter("V_SYSTEM_FAILURE_TYPE",command.getSystemFailureType());
        procedureQuery.setParameter("V_SYSTEM_FAILURE_WORK_CD",command.getSystemFailureWorkCd());
        procedureQuery.setParameter("V_SEARCH_TXT",command.getSearchTxt());

        return procedureQuery;
    }
}
