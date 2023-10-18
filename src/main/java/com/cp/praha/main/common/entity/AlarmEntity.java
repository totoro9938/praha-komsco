package com.cp.praha.main.common.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.ZonedDateTime;

@Setter
@Getter
@Entity
@Table(name = "tb_alarm")
public class AlarmEntity {
    @Column(name = "COMPANY_CD", nullable = false, length = 20)
    private String companyCd;
    @Id
    @Column(name = "ALARM_ID", nullable = false)
    private Integer alarmId;

    @Column(name = "ALARM_UUID", nullable = false, length = 100)
    private String alarmUuid;

    @Column(name = "ALARM_TYPE", nullable = false, length = 50)
    private String alarmType;

    @Column(name = "TITLE", nullable = false, length = 100)
    private String title;

    @Column(name = "CONTENTS", nullable = false, length = 4000)
    private String contents;

    @Column(name = "USER_ID", nullable = false)
    private Integer userId;

    @Column(name = "START_DT")
    private ZonedDateTime startDt;

    @Column(name = "ALARM_CYCLE", nullable = false)
    private Integer alarmCycle;

    @Column(name = "END_DT")
    private ZonedDateTime endDt;

    @Column(name = "READ_YN", nullable = false)
    private Character readYn;

    @Column(name = "ALARM_YN", nullable = false)
    private Character alarmYn;

    @Column(name = "ALARM_CNT", nullable = false)
    private Integer alarmCnt;

    @Column(name = "COMPLETE_YN", nullable = false)
    private Character completeYn;

    @Column(name = "SRC_ID1", length = 100)
    private String srcId1;

    @Column(name = "SRC_ID2", length = 100)
    private String srcId2;

    @Column(name = "SRC_ID3", length = 100)
    private String srcId3;

    @Column(name = "SRC_ID4", length = 100)
    private String srcId4;

    @Column(name = "DEL_YN", nullable = false)
    private Character delYn;

    @Column(name = "RGTR_ID", nullable = false)
    private Integer rgtrId;

    @Column(name = "REG_DT", nullable = false)
    private ZonedDateTime regDt;

    @Column(name = "REG_YMD", nullable = false, length = 8)
    private String regYmd;

    @Column(name = "MDFR_ID", nullable = false)
    private Integer mdfrId;

    @Column(name = "MDF_DT", nullable = false)
    private ZonedDateTime mdfDt;

    @Column(name = "MDF_YMD", nullable = false, length = 8)
    private String mdfYmd;

}