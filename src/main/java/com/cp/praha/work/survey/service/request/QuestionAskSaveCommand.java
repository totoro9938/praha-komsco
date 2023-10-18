package com.cp.praha.work.survey.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionAskSaveCommand {
    private Integer questionId;
    private Integer questionAskId;
    private Integer questionAskIdx;
    private String questionAskTarget;
    private String questionAskContent;
    private String questionAskAnswerType;
    private String descriptionYn;
    private int userId;

}
