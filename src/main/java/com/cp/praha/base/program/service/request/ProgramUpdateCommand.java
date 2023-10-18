package com.cp.praha.base.program.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ProgramUpdateCommand {

    @NotNull(message = "programId 값은 필수입니다.")
    @Min(value = 1, message = "programId 값은 1이상이어야 합니다.")
    private Integer programId;
    private Integer programIdx;
    @NotBlank(message = "프로그램명은 필수입니다.")
    private String programNm;
    @NotBlank(message = "룰명은 필수입니다.")
    private String roleNm;
    @NotBlank(message = "URL은 필수입니다.")
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
    private String sysYn;
    private String menuYn;
    private String popupYn;
    private String useYn;
    private String delYn;
    private String description;
    private String reIdxYn;
    private Integer mdfrId;
}
