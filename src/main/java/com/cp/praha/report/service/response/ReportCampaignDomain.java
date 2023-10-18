package com.cp.praha.report.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class ReportCampaignDomain {
    @Id
    private int no;
    private int campaignId;
    private String campaignNm;
    private String dt;
    private String campaignType;
    private String campaignTypeNm;
    private int totalCnt;
    private int processingCnt;
    private int completeCnt;
    private int callsuccessCnt;
    private int impossibleCnt;
    private int rejectionCnt;
    private int skipCnt;
    private int greatsatisfactionCnt;
    private int satisfactionCnt;
    private int normalityCnt;
    private int dissatisfactionCnt;
    private int greatdissatisfactionCnt;
}
