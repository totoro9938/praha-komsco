package com.cp.praha.base.logInfo.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class LogInfoAclSelectPageDomain {
    private Integer no;
    private String companyCd;
    @Id
    private Integer aclLogIdx;
    private String tableNm;
    private String aclKey;
    private String aclCrud;
    private String ip;
    private String description;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private String boundTelNo;
}
