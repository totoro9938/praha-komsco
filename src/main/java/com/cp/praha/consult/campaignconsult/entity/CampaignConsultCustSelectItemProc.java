package com.cp.praha.consult.campaignconsult.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.consult.campaignconsult.service.request.CampaignConsultCustSelectItemCommand;
import com.cp.praha.consult.campaignconsult.service.response.CampaignConsultCustSelectItemDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = CampaignConsultCustSelectItemProc.PROC_NAME,
        procedureName = CampaignConsultCustSelectItemProc.PROC_NAME,
        resultClasses = CampaignConsultCustSelectItemDomain.class,
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
public class CampaignConsultCustSelectItemProc {
    public static final String PROC_NAME = "USP_CAMPAIGN_CUST_SEL_ITEM";

    @Id
    private Integer campaignId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager , CampaignConsultCustSelectItemCommand command) {
        StoredProcedureQuery procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_CAMPAIGN_ID", command.getCampaignId());
        procedureQuery.setParameter("V_CAMPAIGN_CUST_ID", command.getCampaignCustId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
