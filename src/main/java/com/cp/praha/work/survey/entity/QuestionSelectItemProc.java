package com.cp.praha.work.survey.entity;

import com.cp.praha.work.survey.service.response.QuestionSelectItemDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = QuestionSelectItemProc.PROC_NAME,
        procedureName = QuestionSelectItemProc.PROC_NAME,
        resultClasses = QuestionSelectItemDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_QUESTION_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class QuestionSelectItemProc {
    public final static String PROC_NAME = "USP_QUESTION_SEL_ITEM";
    @Id
    private int uuid;
}
