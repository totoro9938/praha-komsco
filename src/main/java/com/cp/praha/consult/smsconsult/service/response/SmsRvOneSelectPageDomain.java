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
public class SmsRvOneSelectPageDomain {
    private int no;
    private String companyCd;
    @Id
    private String smsRvId;
    private String smsRvStatus;
    private String smsRvStatusNm;
    private ZonedDateTime inTime;
    private String telNo;
    private int userId;
    private String userNm;
    private String processNm;
    private String rvMessage;
    private String snMessage;
    private String processYn;
    private ZonedDateTime processDt;
    private String msgKindNm;
    private String snResultNm;
    private String smsReplyCnt;
    private String spamUuid;
    private String attachImage1;
    private String attachImage2;
    private String attachImage3;
}
