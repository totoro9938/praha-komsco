package com.cp.praha.consult.boundlist.service.response;

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
public class BoundSelectPageDomain {
  private String companyCd;
  @Id
  private int    boundId;
  private String boundUuid;
  private String ctiCallId;
  private String uui;
  private String ctiStation;
  private String recordingId;
  private String boundTelNo;
  private String dnis;
  private String boundType;
  private String callType;
  private ZonedDateTime boundDt;
  private String boundYmd;
  private ZonedDateTime callRingDt;
  private ZonedDateTime callDt;
  private String callYmd;
  private int    callHh;
  private int    callSs;
  private ZonedDateTime closeCallDt;
  private String closeCallYmd;
  private int    closeCallSs;
  private int    campaignId;
  private int    campaignCustId;
  private int    reservationBoundId;
  private int    reservationCallId;
  private int    callbackId;
  private String agentIp;
  private String connId;
  private String downYn;
  private String fileNm;
  private String saveFilePath;
  private int    rgtrId;
  private String rgtrNm;
  private ZonedDateTime regDt;
  private String regYmd;
}
