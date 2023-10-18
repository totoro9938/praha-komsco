package com.cp.praha.board.message.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class MessageSelectPageDomain {
    @Id
    private Integer messageId;
    private String messageUuid;
    private String messageType;
    private String fileYn;
    private Integer topId;
    private Integer parentId;
    private String importanceRcv;
    private String importanceSnd;
    private String contents;
    private Integer readCnt;
    private Integer readPerCnt;
    private Integer confirmCnt;
    private Integer confirmPerCnt;
    private String openYn;
    private String messageReceiverIdList;
    private String messageReceiverNmList;
    private Integer fileId;
    private Integer fileCnt;
    private String description;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private String rcvOpenYn;
}
