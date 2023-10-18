package com.cp.praha.work.survey.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.work.survey.service.SurveyService;
import com.cp.praha.work.survey.service.request.*;
import com.cp.praha.work.survey.service.response.QuestionAskAnswerSelectDomain;
import com.cp.praha.work.survey.service.response.QuestionAskSelectDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/work/v1")
@Secured("ROLE_WORK_SURVAY_TEMPLATE_SELECT")
public class SurveyRestController {

    private final SurveyService surveyService;

    @GetMapping("/survey/selectPage")
    public GridDomain questionSelect(QuestionSelectPageCommand command){
            return surveyService.questionSelect(command);
    }

    @Secured("ROLE_WORK_SURVAY_TEMPLATE_INSERT")
    @PostMapping("/survey/question/save")
    public int questionSave(@RequestBody @Valid QuestionSaveCommand command){
        return surveyService.questionSave(command);
    }

    @Secured("ROLE_WORK_SURVAY_TEMPLATE_DELETE")
    @DeleteMapping("/survey/question-delete/{questionId}")
    public ResponseEntity<HttpStatus> questionDelete(@PathVariable int questionId){
        surveyService.questionDelete(questionId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/survey/question-ask/{questionId}")
    public List<QuestionAskSelectDomain> questionAskSelect(@PathVariable int questionId){
        return surveyService.questionAskSelect(questionId);
    }
    @PostMapping("/survey/question-ask")
    @Secured("ROLE_WORK_SURVAY_TEMPLATE_INSERT")
    public ResponseEntity<HttpStatus> questionAskSave(@RequestBody List<QuestionAskSaveCommand> command){
        surveyService.questionAskSave(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Secured("ROLE_WORK_SURVAY_TEMPLATE_DELETE")
    @DeleteMapping("/survey/question-ask-delete")
    public ResponseEntity<HttpStatus> questionAskDelete(@RequestBody List<QuestionAskDeleteCommand> command){
        surveyService.questionAskDelete(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/survey/question-ask-answer")
    public List<QuestionAskAnswerSelectDomain> questionAskAnswerSelect(QuestionAskAnswerSelectCommand command){
        return surveyService.questionAskAnswerSelect(command);
    }

    @Secured("ROLE_WORK_SURVAY_TEMPLATE_INSERT")
    @PostMapping("/survey/question-ask-answer")
    public ResponseEntity<HttpStatus> questionAskAnswerSave(@RequestBody List<QuestionAskAnswerSaveCommand> command){
        surveyService.questionAskAnswerSave(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Secured("ROLE_WORK_SURVAY_TEMPLATE_DELETE")
    @DeleteMapping("/survey/question-ask-answer-delete")
    public ResponseEntity<HttpStatus> questionAskAnswerDelete(@RequestBody List<QuestionAskAnswerDeleteCommand> command){
        surveyService.questionAskAnswerDelete(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
