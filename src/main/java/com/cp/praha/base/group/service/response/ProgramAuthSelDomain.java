package com.cp.praha.base.group.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter @Setter
@ToString @Entity
public class ProgramAuthSelDomain {

    private String companyCd;
    @Id
    private Integer programId;
    private String programUuid;
    private String roleNm;
    private String fullProgramNm;
    private String grantSelect;
    private String grantInsert;
    private String grantUpdate;
    private String grantDelete;
    private String grantPrint;
    private String grantDown;
    private String grantRangeAll;
    private String grantRangeSub;
    private String grantRangeOwn;
    private String grantAgent;
    private String grantExtend_01;
    private String grantExtend_02;
    private String grantExtend_03;
    private String grantExtend_04;
    private String grantExtend_05;
    private String grantExtend_06;
    private String grantExtend_07;
    private String grantExtend_08;
    private String grantExtend_09;
    private String grantExtend_10;
    private String grantExtend_11;
    private String grantExtend_12;
    private String grantExtend_13;
    private String grantExtend_14;
    private String grantExtend_15;
    private String programInsert;
    private String programUpdate;
    private String programDelete;
    private String programPrint;
    private String programDown;
    private String deptRangeAll;
    private String deptRangeSub;
    private String deptRangeOwn;
    private String agentSelect;
    private String programExtend_01;
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
    private String insYn;
    private String uptYn;

}
