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
public class QuestionAskAnswerSelectDomain {
    private int questionId;
    private int questionAskId;
    @Id
    private int questionAskAnswerId;
    private int questionAskAnswerIdx;
    private String questionAskAnswerContent;
    private String questionAskAnswerScore;
    private int rgtrId;
    private ZonedDateTime regDt;
    private int mdfrId;
    private ZonedDateTime mdfDt;
}
