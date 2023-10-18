package com.cp.praha.board.notice.service.request;

import com.cp.praha.main.common.service.response.FileInfoDomain;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class NoticeDocInsertCommand {
    private String cabinetCd;
    @NotNull(message = "상위아이디는 필수입니다.")
    @Min(value = 0)
    private int parentId;
    @NotNull(message = "부서아이디는 필수입니다.")
    @Min(value = 0)
    private int deptId;
    @NotNull(message = "담당자아이디는 필수입니다.")
    @Min(value = 0)
    private int chargeId;
    private String workType;
    private String noticeYn;
    private String noticeScope;
    private String receiverIdList;
    private int receiverCnt;
    private String receiverDeptIdList;
    private int receiverDeptCnt;
    private String importance;
    private String docNm;
    private String contents;
    private String html;
    private List<FileInfoDomain> files;
    private int rgtrId;
}
