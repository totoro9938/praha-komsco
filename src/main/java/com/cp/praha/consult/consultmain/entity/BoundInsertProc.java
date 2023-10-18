package com.cp.praha.consult.consultmain.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultmain.service.request.BoundInsertCommand;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@NamedStoredProcedureQuery(
        name = BoundInsertProc.PROC_NAME,
        procedureName = BoundInsertProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CTI_CALL_ID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_UUI", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CTI_STATION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RECORDING_ID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DNIS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_CUST_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESERVATION_BOUND_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESERVATION_CALL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALLBACK_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_AGENT_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONN_ID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_BOUND_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class BoundInsertProc {
    public final static String PROC_NAME = "USP_BOUND_INS";
    @Id
    private int id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, BoundInsertCommand command, String ip) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_BOUND_UUID", UUID.randomUUID().toString());
        procedureQuery.setParameter("V_CTI_CALL_ID", command.getCtiCallId());
        procedureQuery.setParameter("V_UUI", command.getUui());
        procedureQuery.setParameter("V_CTI_STATION", command.getCtiStation());
        procedureQuery.setParameter("V_RECORDING_ID", command.getRecordingId());
        procedureQuery.setParameter("V_BOUND_TEL_NO", command.getBoundTelNo());
        procedureQuery.setParameter("V_DNIS", command.getDnis());
        procedureQuery.setParameter("V_BOUND_TYPE", command.getBoundType());
        procedureQuery.setParameter("V_CALL_TYPE","Call");
        procedureQuery.setParameter("V_CAMPAIGN_ID",command.getCampaignId());
        procedureQuery.setParameter("V_CAMPAIGN_CUST_ID",command.getCampaignCustId());
        procedureQuery.setParameter("V_RESERVATION_BOUND_ID", command.getReservationBoundId());
        procedureQuery.setParameter("V_RESERVATION_CALL_ID", command.getReservationCallId());
        procedureQuery.setParameter("V_CALLBACK_ID", command.getCallbackId());
        procedureQuery.setParameter("V_AGENT_IP", ip);
        procedureQuery.setParameter("V_CONN_ID", command.getConnId());
        procedureQuery.setParameter("V_RGTR_ID", userInfo.getUser().getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
