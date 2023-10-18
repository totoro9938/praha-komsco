package com.cp.praha.work.survey.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.work.survey.entity.*;
import com.cp.praha.work.survey.service.request.*;
import com.cp.praha.work.survey.service.response.QuestionAskAnswerSelectDomain;
import com.cp.praha.work.survey.service.response.QuestionAskSelectDomain;
import com.cp.praha.work.survey.service.response.QuestionSelectDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SurveyService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;
    private final UserInfo userInfo;

    public GridDomain questionSelect(QuestionSelectPageCommand command) {
        var procedure = QuestionSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        var totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        var curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount(totalCount);
        gridDomain.setCurPage(curPage);
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList()));
        return gridDomain;
    }

    @Transactional
    public int questionSave(QuestionSaveCommand command) {
        command.setUserId(userInfo.getUser().getUserId());
        var procedure = QuestionSaveProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return (Integer) procedure.getOutputParameterValue("O_QUESTION_ID");
    }

    @Transactional
    public void questionDelete(int questionId) {
        var procedure = QuestionDeleteProc.procedureQuery(entityManager,questionId, userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(procedure);
    }

    public List<QuestionAskSelectDomain> questionAskSelect(int questionId) {
        var procedure = QuestionAskSelectProc.procedureQuery(entityManager,questionId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){}, procedure.getResultList());
    }

    @Transactional
    public void questionAskSave (List<QuestionAskSaveCommand> command){
        for(QuestionAskSaveCommand cmd : command){
            cmd.setUserId(userInfo.getUser().getUserId());
            var procedure = QuestionAskSaveProc.procedureQuery(entityManager,cmd);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    public void questionAskDelete(List<QuestionAskDeleteCommand> command) {
        for(QuestionAskDeleteCommand cmd : command){
            cmd.setUserId(userInfo.getUser().getUserId());
            var procedure = QuestionAskDeleteProc.procedureQuery(entityManager,cmd);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    public List<QuestionAskAnswerSelectDomain> questionAskAnswerSelect(QuestionAskAnswerSelectCommand command) {
        var procedure = QuestionAskAnswerSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList());
    }

    @Transactional
    public void questionAskAnswerSave(List<QuestionAskAnswerSaveCommand> command) {
        for(QuestionAskAnswerSaveCommand cmd : command){
            cmd.setUserId(userInfo.getUser().getUserId());
            var procedure = QuestionAskAnswerSaveProc.procedureQuery(entityManager,cmd);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    public void questionAskAnswerDelete(List<QuestionAskAnswerDeleteCommand> command) {
        for(QuestionAskAnswerDeleteCommand cmd : command){
            cmd.setUserId(userInfo.getUser().getUserId());
            var procedure = QuestionAskAnswerDeleteProc.procedureQuery(entityManager,cmd);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    public List<QuestionSelectDomain> questionSelect(QuestionSelectCommand command) {
        var procedure = QuestionSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){}, procedure.getResultList());
    }


}
