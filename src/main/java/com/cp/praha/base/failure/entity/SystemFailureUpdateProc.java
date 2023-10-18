package com.cp.praha.base.failure.entity;

import com.cp.praha.base.failure.service.request.SystemFailureUpdateCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.failure.entity.SystemFailureUpdateProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYSTEM_FAILURE_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYSTEM_FAILURE_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYSTEM_FAILURE_WORK_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYSTEM_FAILURE_CONTENTS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYSTEM_FAILURE_ACTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYSTEM_FAILURE_WORKER", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OUTBREAK_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ARRIVE_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                ),

        }
)

@Getter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SystemFailureUpdateProc {
    public static final String PROC_NAME = "USP_SYSTEM_FAILURE_UPT";

    @Id
    private String systemFailureUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, SystemFailureUpdateCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_SYSTEM_FAILURE_UUID",command.getSystemFailureUuid());
        procedureQuery.setParameter("V_SYSTEM_FAILURE_TYPE",command.getSystemFailureType());
        procedureQuery.setParameter("V_SYSTEM_FAILURE_WORK_CD",command.getSystemFailureWorkCd());
        procedureQuery.setParameter("V_SYSTEM_FAILURE_CONTENTS",command.getSystemFailureContents());
        procedureQuery.setParameter("V_SYSTEM_FAILURE_ACTION",command.getSystemFailureAction());
        procedureQuery.setParameter("V_SYSTEM_FAILURE_WORKER",command.getSystemFailureWorker());
        procedureQuery.setParameter("V_OUTBREAK_DT",command.getOutbreakDt());
        procedureQuery.setParameter("V_ARRIVE_DT",command.getArriveDt());
        procedureQuery.setParameter("V_START_DT",command.getStartDt());
        procedureQuery.setParameter("V_END_DT",command.getEndDt());
        procedureQuery.setParameter("V_MDFR_ID",command.getMdfrId());
        procedureQuery.execute();

    return procedureQuery;
    }
}
