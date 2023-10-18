package com.cp.praha.knowledge.manualmanager.service.request;

import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerInsertCommand;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerUpdateCommand;
import com.cp.praha.main.common.service.response.FileInfoDomain;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter @Setter
public class ManualUpdateCommand {

    private Integer manualId;
    private String manualType;
    private String importance;
    private String fontColor;
    @NotNull(message = "상담분류는 필수입니다.")
    @Min(value = 0)
    private Integer callCatId;
    private String title;
    @NotNull(message = "부서 아이디는 필수입니다.")
    @Min(value = 0)
    private Integer deptId;
    @NotNull(message = "담당자 아이디는 필수입니다.")
    @Min(value = 0)
    private Integer chargeId;
    private String telNo;
    private String description;
    private String contents;
    private String html;
    @NotNull(message = "매뉴얼요청아이디는 필수입니다.")
    @Min(value = 0)
    private Integer requestManualId;
    private String startDate;
    private String endDate;
    private String useYn;
    private String requestReason;
    private String approvalYn;
    private Integer mdfrId;

    private List<ManualWorkerInsertCommand> manualWorkerInsertCommand;
    private List<ManualWorkerUpdateCommand> manualWorkerUpdateCommand;

    private List<FileInfoDomain> files;
    private List<Integer> deleteFileIds;

}
