package com.cp.praha.report.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
@ToString
public class ReportProcessCenterDomain {
    @Id
    private String itemCd;
    private String itemNm;
    private String itemGb;
    private Integer itemCnt;
    private String subCnt;
    private String processRate;
}
