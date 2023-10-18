package com.cp.praha.work.survey.service.response;

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
public class QuestionSelectPageDomain {
	@Id
    private int questionId;
	private int questionIdx;
	private String questionUuid;
	private String questionType;
	private String questionTypeNm;
	private String questionNm;
	private int questionAskCnt;
	private String description;
	private String useYn;
	private int rgtrId;
	private String rgtrNm;
	private ZonedDateTime regDt;
	private String regYmd;
}
