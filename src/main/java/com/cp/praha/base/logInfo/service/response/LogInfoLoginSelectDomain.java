package com.cp.praha.base.logInfo.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class LogInfoLoginSelectDomain {
    private Integer no;
    private String companyCd;
    private Integer userId;
    private String userCd;
    private String userNm;
    private String logGb;
    private String description;
    private String ip;
    private ZonedDateTime loginDt;
    private String loginYmd;
    @Id
    private Integer loginLogIdx;
}
