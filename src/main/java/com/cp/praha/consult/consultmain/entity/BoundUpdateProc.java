package com.cp.praha.consult.consultmain.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultmain.service.request.BoundUpdateCommand;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = BoundUpdateProc.PROC_NAME,
        procedureName = BoundUpdateProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CTI_STATION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CLOSE_CALL_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_AGENT_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class BoundUpdateProc {
    public final static String PROC_NAME = "USP_BOUND_UPT";
    @Id
    private int id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, BoundUpdateCommand command, String ip) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_BOUND_ID", command.getBoundId());
        procedureQuery.setParameter("V_CTI_STATION", command.getCtiStation());
        procedureQuery.setParameter("V_CALL_DT", command.getCallDt());
        procedureQuery.setParameter("V_CLOSE_CALL_DT", command.getCloseCallDt());
        procedureQuery.setParameter("V_AGENT_IP", ip);
        procedureQuery.setParameter("V_MDFR_ID", userInfo.getUser().getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
