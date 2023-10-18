package com.cp.praha.board.notice.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class NoticeDocSelectPageDomain {
    private int no;
    @Id
    private int docId;
    private String docUuid;
    private String cabinetCd;
    private int topId;
    private int parentId;
    private int deptId;
    private int chargeId;
    private String telNo;
    private String workType;
    private int docLvl;
    private int docIdx;
    private String docPath;
    private String sortPath;
    private String noticeYn;
    private String noticeScope;
    private int noticeReceiverCnt;
    private int noticeReceiverDeptCnt;
    private String approvalYn;
    private String startYmd;
    private String endYmd;
    private String importance;
    private String importanceNm;
    private String docNm;
    private String ip;
    private int readCnt;
    private int readPerCnt;
    private int confirmPerCnt;
    private int commentCnt;
    private String delYn;
    private String inheritDelYn;
    private int rgtrId;
    private String rgtrNm;
    private String rgtrDeptNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private int mdfrId;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}
