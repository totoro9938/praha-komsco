package com.cp.praha.board.notice.service.request;

import com.cp.praha.main.common.service.response.FileInfoDomain;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class NoticeDocUpdateCommand {
    private String cabinetCd;
    @NotNull(message = "문서아이디는 필수입니다.")
    @Min(value = 0)
    private Integer docId;
    @NotNull(message = "부서아이디는 필수입니다.")
    @Min(value = 0)
    private Integer deptId;
    @NotNull(message = "담당자아이디는 필수입니다.")
    @Min(value = 0)
    private Integer chargeId;
    private String docUuid;
    private String workType;
    private String noticeYn;
    private String noticeScope;
    private String receiverIdList;
    private Integer receiverCnt;
    private String receiverDeptIdList;
    private Integer receiverDeptCnt;
    private String importance;
    private String docNm;
    private String contents;
    private String html;
    private List<FileInfoDomain> files;
    private List<Integer> deleteFileIds;
    private int mdfrId;
}
