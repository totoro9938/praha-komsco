package com.cp.praha.consult.smsconsult.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
@Entity
public class SmsRvSelectPageDomain {
    private int no;
    private String companyCd;
    @Id
    private String smsRvMid;
    private ZonedDateTime firstRvDt;
    private ZonedDateTime lastRvDt;
    private ZonedDateTime lastReplyDt;
    private String telNo;
    private int userId;
    private String userNm;
    private int nonReplyCnt;
    private String spamYn;
}
