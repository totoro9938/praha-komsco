package com.cp.praha.consult.consultmain.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.consultmain.service.request.ConusltCallInsertCommand;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@NamedStoredProcedureQuery(
        name = CallInsertProc.PROC_NAME,
        procedureName = "USP_CALL_INS",
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_ID", type = Integer.class, mode = ParameterMode.IN
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
                        name = "V_AGENT_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CONN_ID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CUST_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_CALL_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_CLASS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CHARGE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_CAT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CLOSE_CALL_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_QUESTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ANSWER", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MEMO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_OB_RESULT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESERVATION_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESERVATION_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESERVATION_DT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RESERVATION_MEMO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TRANSFER_DEPT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TRANSFER_CHARGE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TRANSFER_MEMO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TRANSFER_EMERGENCY", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TRANSFER_FILE_YN", type = String.class, mode = ParameterMode.IN
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
                        name = "V_CAMPAIGN_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_CUST_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_BOUND_ID", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_CALL_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class CallInsertProc {
    public final static String PROC_NAME = "USP_CALL_INS";
    @Id
    private int id;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, ConusltCallInsertCommand command, String ip) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_BOUND_ID", command.getBoundId());
        procedureQuery.setParameter("V_CTI_CALL_ID", command.getCtiCallId());
        procedureQuery.setParameter("V_UUI", command.getUui());
        procedureQuery.setParameter("V_CTI_STATION", command.getCtiStation());
        procedureQuery.setParameter("V_RECORDING_ID", command.getRecordingId());
        procedureQuery.setParameter("V_BOUND_TEL_NO", command.getBoundTelNo());
        procedureQuery.setParameter("V_DNIS", command.getDnis());
        procedureQuery.setParameter("V_AGENT_IP", ip);
        procedureQuery.setParameter("V_CONN_ID", command.getConnId());
        procedureQuery.setParameter("V_BOUND_TYPE", command.getBoundType());
        procedureQuery.setParameter("V_CALL_UUID", UUID.randomUUID().toString());
        procedureQuery.setParameter("V_CUST_ID", command.getCustId());
        procedureQuery.setParameter("V_CUST_NM", command.getCustNm());
        procedureQuery.setParameter("V_PARENT_CALL_UUID", command.getParentCallUuid());
        procedureQuery.setParameter("V_CALL_CLASS", command.getCallClass());
        procedureQuery.setParameter("V_DEPT_ID",command.getDeptId());
        procedureQuery.setParameter("V_CHARGE_ID", command.getChargeId());
        procedureQuery.setParameter("V_CALL_CAT_ID", command.getCallCatId());
        procedureQuery.setParameter("V_CALL_DT", command.getCallStartDt());
        procedureQuery.setParameter("V_CLOSE_CALL_DT", command.getCallEndDt());
        procedureQuery.setParameter("V_QUESTION", command.getQuestion());
        procedureQuery.setParameter("V_ANSWER", command.getAnswer());
        procedureQuery.setParameter("V_MEMO", command.getMemo());
        procedureQuery.setParameter("V_CALL_TYPE", command.getCallType());
        procedureQuery.setParameter("V_CALL_OB_RESULT",command.getCallObResult());
        procedureQuery.setParameter("V_RESERVATION_USER_ID", command.getReservationUserId());
        procedureQuery.setParameter("V_RESERVATION_TEL_NO", command.getReservationTelNo());
        procedureQuery.setParameter("V_RESERVATION_DT", command.getReservationDt());
        procedureQuery.setParameter("V_RESERVATION_MEMO", command.getReservationMemo());
        procedureQuery.setParameter("V_TRANSFER_DEPT_ID", command.getTransferDeptId());
        procedureQuery.setParameter("V_TRANSFER_CHARGE_ID", command.getTransferChargeId());
        procedureQuery.setParameter("V_TRANSFER_MEMO", command.getTransferMemo());
        procedureQuery.setParameter("V_TRANSFER_EMERGENCY","N");
        procedureQuery.setParameter("V_TRANSFER_FILE_YN", "N");
        procedureQuery.setParameter("V_RESERVATION_BOUND_ID", command.getReservationBoundId());
        procedureQuery.setParameter("V_RESERVATION_CALL_ID", command.getReservationCallId());
        procedureQuery.setParameter("V_CALLBACK_ID", command.getCallbackId());
        procedureQuery.setParameter("V_CAMPAIGN_ID", command.getCampaignId());
        procedureQuery.setParameter("V_CAMPAIGN_CUST_ID", command.getCampaignCustId());
        procedureQuery.setParameter("V_RGTR_ID", userInfo.getUser().getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
