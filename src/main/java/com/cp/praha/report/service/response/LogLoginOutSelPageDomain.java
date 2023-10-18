package com.cp.praha.report.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
@Entity
public class LogLoginOutSelPageDomain {
    @Id
    private int no;
    private String loginYmd;
    private String userCd;
    private String userNm;
    private ZonedDateTime loginDt;
    private ZonedDateTime logoutDt;
}
