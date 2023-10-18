package com.cp.praha.consult.smsconsult.web;

import com.cp.praha.base.category.service.CategoryService;
import com.cp.praha.base.category.service.request.CategoryTreeCommand;
import com.cp.praha.base.category.service.response.CategoryTreeDomain;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.consult.smsconsult.service.SmsConsultService;
import com.cp.praha.consult.smsconsult.service.request.SmsRvOneSelectPageCommand;
import com.cp.praha.consult.smsconsult.service.request.SmsRvSelectPageCommand;
import com.cp.praha.consult.smsconsult.service.request.SmsRvSmsInserCommand;
import com.cp.praha.consult.smsconsult.service.request.SmsSpamTelNoInsertCommand;
import com.cp.praha.consult.smsconsult.service.response.SmsRvContentsSelectDomain;
import com.cp.praha.main.common.service.WebSocketService;
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
@RequestMapping("/consult/v1")
@Secured("ROLE_CONSULT_SMS_CONSULT_SELECT")
public class SmsConsultRestController {
    private final CategoryService categoryService;
    private final WebSocketService webSocketService;
    private final SmsConsultService smsConsultService;

    @GetMapping("/cat/treeSelect")
    public List<CategoryTreeDomain> categoryTreeSelect(CategoryTreeCommand command){
        return categoryService.categoryTreeSelect(command);
    }

    @GetMapping("/sms/select-page")
    public GridDomain smsRvSelectPage(SmsRvSelectPageCommand command){
        return smsConsultService.smsRvSelectPage(command);
    }

    /**
     *   SMS RV 단건 단위 페이지 조회
     */
    @GetMapping("/sms/select-one-page")
    public GridDomain smsRvOneSelectPage(SmsRvOneSelectPageCommand command){
        return smsConsultService.smsRvOneSelectPage(command);
    }

    @GetMapping("/sms/contents/{smsRvId}")
    public List<SmsRvContentsSelectDomain> smsRvSelectItem(@PathVariable String smsRvId){
        return smsConsultService.smsRvSelectItem(smsRvId);
    }
    @Secured("ROLE_CONSULT_SMS_CONSULT_UPDATE")
    @PutMapping("/sms/allocate/{smsRvId}")
    public ResponseEntity<HttpStatus> smsRvAllocate(@PathVariable String smsRvId) {
        smsConsultService.smsRvAllocate(smsRvId);
        //webSocketService.alarmSourceSend(AlarmSrcId.SMS_RV,smsRvId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @Secured("ROLE_CONSULT_SMS_CONSULT_UPDATE")
    @PutMapping("/sms/allocate/released/{smsRvId}")
    public ResponseEntity<HttpStatus> smsRvAllocateReleased(@PathVariable String smsRvId) {
        smsConsultService.smsRvAllocateReleased(smsRvId);
        //webSocketService.alarmSourceSend(AlarmSrcId.SMS_RV,smsRvId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @Secured("ROLE_CONSULT_SMS_CONSULT_INSERT")
    @PostMapping("/sms/spam/insert")
    public ResponseEntity<HttpStatus> smsSpamInsert(@RequestBody @Valid SmsSpamTelNoInsertCommand command) {
        smsConsultService.smsSpamInsert(command);
        //webSocketService.alarmSourceSend(AlarmSrcId.SMS_RV,command.getSmsMid());
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @Secured("ROLE_CONSULT_SMS_CONSULT_UPDATE")
    @PutMapping("/sms/spam-release/{uuid}")
    public ResponseEntity<HttpStatus> smsSpamRelease(@PathVariable String uuid){
        smsConsultService.smsSpamRelease(uuid);
        //webSocketService.alarmSourceSend(AlarmSrcId.SMS_RV,smsMid);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @Secured("ROLE_CONSULT_SMS_CONSULT_INSERT")
    @PostMapping("/sms/send")
    public ResponseEntity<HttpStatus> smsSend(@RequestBody @Valid SmsRvSmsInserCommand command) {
        smsConsultService.smsSend(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @Secured("ROLE_CONSULT_SMS_CONSULT_UPDATE")
    @PutMapping("/sms/skip/{smsRvId}")
    public ResponseEntity<HttpStatus> smsSkip(@PathVariable String smsRvId) {
        smsConsultService.smsSkip(smsRvId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
