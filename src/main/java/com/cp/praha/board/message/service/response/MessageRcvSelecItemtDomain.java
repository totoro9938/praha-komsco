package com.cp.praha.board.message.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class MessageRcvSelecItemtDomain {
    private Integer messageId;
    @Id
    private Integer messageReceiverId;
    private String userNm;
    private String deptNm;
    private String fullDeptNm;
    private Integer rgtrId;
    private ZonedDateTime regDt;
    private String regYmd;
    private ZonedDateTime openDt;
    private String openYn;
}
