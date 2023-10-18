package com.cp.praha.work.survey.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.survey.service.request.QuestionAskAnswerSelectCommand;
import com.cp.praha.work.survey.service.response.QuestionAskAnswerSelectDomain;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static com.cp.praha.work.survey.entity.QuestionAskAnswerSelectProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = QuestionAskAnswerSelectDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_QUESTION_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_QUESTION_ASK_ID", type = Integer.class, mode = ParameterMode.IN
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
public class QuestionAskAnswerSelectProc {
    public final static String PROC_NAME = "USP_QUESTION_ASK_ANSWER_SEL";
    @Id
    private int uuid;
    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      QuestionAskAnswerSelectCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_QUESTION_ID",command.getQuestionId());
        procedureQuery.setParameter("V_QUESTION_ASK_ID",command.getQuestionAskId());

        procedureQuery.execute();

        return procedureQuery;
    }
}
