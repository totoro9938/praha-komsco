package com.cp.praha.work.campaign.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CampaignSelectItemCommand {
    private String campaignUuid;
    private String outputYn;
}
