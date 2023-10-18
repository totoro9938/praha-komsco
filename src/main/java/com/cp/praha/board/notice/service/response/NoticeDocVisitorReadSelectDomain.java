package com.cp.praha.board.notice.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class NoticeDocVisitorReadSelectDomain {
    @Id
    private Integer rgtrId;
    private String rgtrNm;
    private String fullDeptNm;
    private ZonedDateTime regDt;
    private String readCnt;
}
