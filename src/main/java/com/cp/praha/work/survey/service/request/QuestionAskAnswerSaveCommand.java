package com.cp.praha.work.survey.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionAskAnswerSaveCommand {
    private int questionId;
    private int questionAskId;
    private int questionAskAnswerId;
    private int questionAskAnswerIdx;
    private String  questionAskAnswerContent;
    private int questionAskAnswerScore;
    private int userId;
}
