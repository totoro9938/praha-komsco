package com.cp.praha.work.survey.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionAskAnswerSelectCommand {
    public int questionId;
    public int questionAskId;
}
