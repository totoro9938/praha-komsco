package com.cp.praha.work.survey.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionSaveCommand {
    private Integer questionId;
    private String questionNm;
    private String questionType;
    private String useYn;
    private String description;
    private int userId;

}
