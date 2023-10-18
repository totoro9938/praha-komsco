package com.cp.praha.board.resourceboard.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class EventBoardSelectItemDomain {
    private int eventId;
    private String eventUuid;
    private int deptId;
    private String fullDeptNm;
    @Id
    private int eventIdx;
    private String startYmd;
    private String endYmd;
    private String eventNm;
    private String contents;
    private String contact;
    private String url;
    private String html;
    private String ip;
    private String delYn;
    private int rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private int mdfrId;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}
