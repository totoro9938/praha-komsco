package com.cp.praha.board.notice.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class NoticeDocSelectItemDomain {
    @Id
    private Integer docId;
    private String docUuid;
    private String cabinetCd;
    private String chargeNm;
    private String startYmd;
    private String endYmd;
    private String importance;
    private String importanceNm;
    private String docNm;
    private String contents;
    private String html;
    private Integer rgtrId;
    private String rgtrNm;
    private String deptNm;
    private String fullDeptNm;
    private ZonedDateTime regDt;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
    private String adminYn;
}
