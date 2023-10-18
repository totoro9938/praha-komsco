package com.cp.praha.websocket.message.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class AlarmDomain {
    private String companyCd;
    @Id
    private Integer alarmId;
    private String alarmUuid;
    private String alarmType;
    private String title;
    private String contents;
    private Integer userId;
    private ZonedDateTime startDt;
    private Integer alarmCycle;
    private ZonedDateTime endDt;
    private Character readYn;
    private Character alarmYn;
    private Integer alarmCnt;
    private Character completeYn;
    private String srcId1;
    private String srcId2;
    private String srcId3;
    private String srcId4;
    private Character delYn;
    private Integer rgtrId;
    private ZonedDateTime regDt;
    private String regYmd;
    private Integer mdfrId;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}