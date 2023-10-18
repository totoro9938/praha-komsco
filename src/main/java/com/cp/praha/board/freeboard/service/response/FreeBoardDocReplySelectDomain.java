package com.cp.praha.board.freeboard.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class FreeBoardDocReplySelectDomain {
    @Id
    private Integer docId;
    private String docUuid;
    private String cabinetCd;
    private Integer topId;
    private Integer parentId;
    private String contents;
    private Integer rgtrId;
    private String rgtrNm;
    private String deptNm;
    private String fullDeptNm;
    private ZonedDateTime regDt;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
}
