package com.cp.praha.board.notice.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class NoticeDocSelectDomain {
    @Id
    private Integer docId;
    private String docUuid;
    private String cabinetCd;
    private Integer topId;
    private Integer parentId;
    private Integer deptId;
    private Integer chargeId;
    private String telNo;
    private String workType;
    private Integer docLvl;
    private Integer docIdx;
    private String docPath;
    private String sortPath;
    private String noticeYn;
    private String noticeScope;
    private Integer noticeReceiverCnt;
    private Integer noticereceiverDeptCnt;
    private String approvalYn;
    private String startYmd;
    private String endYmd;
    private String importance;
    private String docNm;
    private String ip;
    private Integer readCnt;
    private Integer readPerCnt;
    private Integer commentCnt;
    private String delYn;
    private String inheritDelYn;
    private Integer rgtrId;
    private String rgtrNm;
    private String rgtrDeptNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private Integer mdfrId;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}
