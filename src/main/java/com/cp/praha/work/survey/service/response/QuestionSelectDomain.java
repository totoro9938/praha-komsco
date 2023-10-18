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
public class QuestionSelectDomain {
    @Id
    private String questionId;
    private String questionNm;
}
