package com.cp.praha.consult.boundlist.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
@ToString
public class BoundSelectItemDomain {
    private String  companyCd;
	private int     boundId;
	@Id
	private String	boundUuid;
	private String	ctiCallId;
	private String	uui;
	private String	ctiStation;
	private String	recordingId;
	private String	boundTelNo;
	private String	dnis;
	private String	boundType;
	private String	callType;
	private ZonedDateTime boundDt;
	private String	boundYmd;
	private ZonedDateTime	callRingDt;
	private ZonedDateTime	callDt;
	private String	callYmd;
	private String	callHh;
	private String	callSs;
	private ZonedDateTime	closeCallDt;
	private String	closeCallYmd;
	private String	closeCallSs;
	private String	campaignId;
	private String	campaignCustId;
	private String	reservationBoundId;
	private String	reservationCallId;
	private String	callbackId;
	private String	agentIp;
	private String	connId;
	private String	downYn;
	private String	fileNm;
	private String	saveFilePath;
	private int 	rgtrId;
	private String	rgtrNm;
	private ZonedDateTime	regDt;
	private String	regYmd;
	private int 	mdfrId;
	private ZonedDateTime	mdfDt;
	private String	mdfYmd;
	private int	callId;
}
