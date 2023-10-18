package com.cp.praha.consult.campaignconsult.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.campaignconsult.service.request.CampaignConsultCustUpdateCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = CampaignConsultCustUpdateProc.PROC_NAME,
        procedureName = CampaignConsultCustUpdateProc.PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_CUST_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_CUST_STATUS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SATISFACTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
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
@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class CampaignConsultCustUpdateProc {
    public static final String PROC_NAME = "USP_CAMPAIGN_CUST_UPT";

    @Id
    private String campaignId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo, CampaignConsultCustUpdateCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_CAMPAIGN_ID", command.getCampaignId());
        procedureQuery.setParameter("V_CAMPAIGN_CUST_ID", command.getCampaignCustId());
        procedureQuery.setParameter("V_BOUND_ID", command.getBoundId());
        procedureQuery.setParameter("V_CALL_ID", command.getCallId());
        procedureQuery.setParameter("V_CAMPAIGN_CUST_STATUS", command.getCampaignCustStatus());
        procedureQuery.setParameter("V_SATISFACTION", command.getSatisfaction());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_MDFR_ID", userInfo.getUser().getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
