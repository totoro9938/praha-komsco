package com.cp.praha.base.logInfo.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class LogInfoPrivateSelectDomain {
    private Integer no;
    private String companyCd;
    private Integer rgtrId;
    private String userNm;
    private String dataGb;
    private String description;
    private String ip;
    private ZonedDateTime regDt;
    private String regYmd;
    @Id
    private Integer privateLogIdx;
}
