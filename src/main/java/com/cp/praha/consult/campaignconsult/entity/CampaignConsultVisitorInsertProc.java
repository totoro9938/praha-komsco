package com.cp.praha.consult.campaignconsult.entity;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.campaignconsult.service.request.CampaignConsultVisitorInsertCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = CampaignConsultVisitorInsertProc.PROC_NAME,
        procedureName = CampaignConsultVisitorInsertProc.PROC_NAME,
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
                        name = "V_BOUND_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_VISITOR_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class CampaignConsultVisitorInsertProc {
    public static final String PROC_NAME = "USP_VISITOR_CAMPAIGN_INS";

    @Id
    private String campaignId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , UserInfo userInfo,CampaignConsultVisitorInsertCommand command, String ip) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_CAMPAIGN_ID", command.getCampaignId());
        procedureQuery.setParameter("V_CAMPAIGN_CUST_ID", command.getCampaignCustId());
        procedureQuery.setParameter("V_BOUND_TEL_NO", command.getBoundTelNo());
        procedureQuery.setParameter("V_RGTR_ID", userInfo.getUser().getUserId());
        procedureQuery.setParameter("V_IP", ip);
        procedureQuery.execute();

        return procedureQuery;
    }
}
