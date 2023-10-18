package com.cp.praha.work.survey.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class QuestionSelectPageCommand {
    public String questionType;
    public String useYn;
    public String questionNm;
    public String sortType;
    public Integer page;
    public Integer totalpage;
}
