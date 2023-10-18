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
public class SmsRvContentsSelectDomain {
    @Id
    private int no;
    private String type;
    private String userNm;
    private ZonedDateTime regDt;
    private String regYmd;
    private String regTime;
    private String message;
    private String groupKey;
}
