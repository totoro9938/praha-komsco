package com.cp.praha.work.survey.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionAskDeleteCommand {
    private int questionId;
    private int questionAskId;
    private int userId;
}
