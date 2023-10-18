package com.cp.praha.work.survey.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionSelectCommand {
    public String useYn;
    public String questionType;
    public String sortType;
}
