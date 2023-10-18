package com.cp.praha.work.campaign.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.campaign.service.response.CampaignSelectItemDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.campaign.entity.CampaignSelectItemProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = CampaignSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_UUID", type = String.class, mode = ParameterMode.IN
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
public class CampaignSelectItemProc {
    public static final String PROC_NAME = "USP_CAMPAIGN_SEL_ITEM";

    @Id
    private String campaignUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      String uuid) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_CAMPAIGN_UUID", uuid);
        procedureQuery.setParameter("V_OUTPUT_YN", "Y");
        procedureQuery.execute();

        return procedureQuery;
    }
}
