package com.cp.praha.work.campaign.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.campaign.service.request.CampaignCustInsertCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.campaign.entity.CampaignCustInsertProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_BOUND_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CALL_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_CAMPAIGN_CUST_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class CampaignCustInsertProc {
    public static final String PROC_NAME = "USP_CAMPAIGN_CUST_INS";

    @Id
    private String campaignId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      CampaignCustInsertCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_CAMPAIGN_ID", command.getCampaignId());
        procedureQuery.setParameter("V_BOUND_ID", command.getBoundId());
        procedureQuery.setParameter("V_CALL_ID", command.getCallId());
        procedureQuery.setParameter("V_RGTR_ID", command.getRgtrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
