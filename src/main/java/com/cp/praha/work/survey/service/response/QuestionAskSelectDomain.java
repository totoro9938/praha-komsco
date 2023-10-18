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
public class QuestionAskSelectDomain {
    private int questionId;
    @Id
    private int questionAskId;
    private int questionAskIdx;
    private String questionAskTarget;
    private String questionAskTargetNm;
    private String questionAskContent;
    private String questionAskAnswerType;
    private String questionAskAnswerTypeNm;
    private int questionAskAnswerCnt;
    private String descriptionYn;
    private String useYn;
    private int rgtrId;
    private ZonedDateTime regDt;
    private int mdfrId;
    private ZonedDateTime mdfDt;
}
