package com.cp.praha.work.survey.entity;

import com.cp.praha.common.util.ProcedureQuery;
import com.cp.praha.work.survey.service.request.QuestionAskAnswerSaveCommand;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import static com.cp.praha.work.survey.entity.QuestionAskAnswerSaveProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
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
                        name = "V_QUESTION_ASK_ANSWER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_QUESTION_ASK_ANSWER_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_QUESTION_ASK_ANSWER_CONTENT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_QUESTION_ASK_ANSWER_SCORE", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_QUESTION_ASK_ANSWER_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class QuestionAskAnswerSaveProc {
    public final static String PROC_NAME = "USP_QUESTION_ASK_ANSWER_SAV";
    @Id
    private int uuid;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      QuestionAskAnswerSaveCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_QUESTION_ID", command.getQuestionId());
        procedureQuery.setParameter("V_QUESTION_ASK_ID",command.getQuestionAskId());
        procedureQuery.setParameter("V_QUESTION_ASK_ANSWER_ID",command.getQuestionAskAnswerId());
        procedureQuery.setParameter("V_QUESTION_ASK_ANSWER_IDX",command.getQuestionAskAnswerIdx());
        procedureQuery.setParameter("V_QUESTION_ASK_ANSWER_CONTENT",command.getQuestionAskAnswerContent());
        procedureQuery.setParameter("V_QUESTION_ASK_ANSWER_SCORE",command.getQuestionAskAnswerScore());
        procedureQuery.setParameter("V_USER_ID", command.getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
