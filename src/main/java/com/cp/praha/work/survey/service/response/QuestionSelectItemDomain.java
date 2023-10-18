package com.cp.praha.work.survey.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class QuestionSelectItemDomain {
    @Id
    private String questionId;
    private int questionIdx;
    private String questionNm;
    private String questionType;
    private String useYn;
    private String description;
}
