package com.cp.praha.base.program.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class ProgramSelectDomain {
    private Integer no;
    private String companyCd;
    @Id
    private Integer programId;
    private String programUuid;
    private Integer parentId;
    private Integer programLvl;
    private Integer programIdx;
    private String programPath;
    private String sortPath;
    private String programNm;
    private String fullProgramNm;
    private String roleNm;
    private String url;
    private String parameter;
    private String navigateUrl;
    private String programDefaultYn;
    private Integer width;
    private Integer height;
    private String programInsert;
    private String programUpdate;
    private String programDelete;
    private String programPrint;
    private String programDown;
    private String deptRangeAll;
    private String deptRangeSub;
    private String deptRangeOwn;
    private String agentSelect;
    private String programExtend_01; //programExtend01 로 네이밍할 경우 에러발생
    private String programExtend_02;
    private String programExtend_03;
    private String programExtend_04;
    private String programExtend_05;
    private String programExtend_06;
    private String programExtend_07;
    private String programExtend_08;
    private String programExtend_09;
    private String programExtend_10;
    private String programExtend_11;
    private String programExtend_12;
    private String programExtend_13;
    private String programExtend_14;
    private String programExtend_15;
    private String menuYn;
    private String popupYn;
    private String sysYn;
    private String inheritSysYn;
    private String useYn;
    private String authUseYn;
    private String inheritAuthUseYn;
    private String delYn;
    private String inheritDelYn;
    private String description;
    private Integer rgtrId;
    private ZonedDateTime regDt;
    private Integer mdfrId;
    private ZonedDateTime mdfDt;
}
