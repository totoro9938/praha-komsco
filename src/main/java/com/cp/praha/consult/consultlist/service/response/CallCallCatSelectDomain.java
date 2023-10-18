package com.cp.praha.consult.consultlist.service.response;

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
public class CallCallCatSelectDomain {
    private int boundId;
    private int callId;
    @Id
    private int callCatId;
    private String catNm;
    private String fullCatNm;
    private String callPart;
    private String callPartNm;
    private int rgtrId;
    private ZonedDateTime regDt;
    private int mdfrId;
    private ZonedDateTime mdfDt;
}
