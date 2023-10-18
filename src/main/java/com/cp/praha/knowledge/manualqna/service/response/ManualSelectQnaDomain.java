package com.cp.praha.knowledge.manualqna.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class ManualSelectQnaDomain {

    private String companyCd;
    @Id
    private Integer manualId;
    private String title;
    private String html;
    private String contents;
    private Integer manualIdx;
    private ZonedDateTime regDt;
    private String rgtrNm;
    private ZonedDateTime mdfDt;
    private String mdfrNm;
}
