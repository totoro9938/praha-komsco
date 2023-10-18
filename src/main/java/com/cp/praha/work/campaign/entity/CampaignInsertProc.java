package com.cp.praha.work.campaign.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.campaign.service.request.CampaignInsertCommand;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.work.campaign.entity.CampaignInsertProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_STATUS", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_START_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_END_DATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_QUESTION_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CAMPAIGN_ID", type = Integer.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "V_REGIST_STEP", type = String.class, mode = ParameterMode.OUT
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
public class CampaignInsertProc {
    public static final String PROC_NAME = "USP_CAMPAIGN_INS";

    @Id
    private String campaignUuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      CampaignInsertCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_CAMPAIGN_UUID", command.getCampaignUuid());
        procedureQuery.setParameter("V_CAMPAIGN_NM", command.getCampaignNm());
        procedureQuery.setParameter("V_CAMPAIGN_TYPE", command.getCampaignType());
        procedureQuery.setParameter("V_CAMPAIGN_STATUS", command.getCampaignStatus());
        procedureQuery.setParameter("V_START_DATE", command.getStartDate());
        procedureQuery.setParameter("V_END_DATE", command.getEndDate());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_QUESTION_ID", command.getQuestionId());
        procedureQuery.setParameter("V_RGTR_ID", command.getRgtrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
