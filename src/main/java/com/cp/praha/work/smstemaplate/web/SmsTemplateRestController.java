package com.cp.praha.work.smstemaplate.web;

import com.cp.praha.consult.consultmain.service.response.SmsTemplateSelectDomain;
import com.cp.praha.work.smstemaplate.service.SmsTemplateService;
import com.cp.praha.work.smstemaplate.service.request.SmsTemplateInsertCommand;
import com.cp.praha.work.smstemaplate.service.request.SmsTemplateSelectPageCommand;
import com.cp.praha.work.smstemaplate.service.request.SmsTemplateUpdateCommand;
import com.cp.praha.work.smstemaplate.service.response.SmsTemplateSelectPageDomain;
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
@Secured("ROLE_WORK_SMS_TEMPLATE_MGR_SELECT")
public class SmsTemplateRestController {
    private final SmsTemplateService smsTemplateService;

    @GetMapping("/sms-template")
    public List<SmsTemplateSelectPageDomain> smsTemplateSelectPage(SmsTemplateSelectPageCommand command){
        return smsTemplateService.smsTemplateSelectPage(command);
    }

    @GetMapping("/sms-template-item/{smsTemplateUuid}")
    public SmsTemplateSelectDomain smsTemplateSelectItem(@PathVariable String smsTemplateUuid){
        return smsTemplateService.smsTemplateSelectItem(smsTemplateUuid);
    }

    @PostMapping("/sms-template")
    @Secured("ROLE_WORK_SMS_TEMPLATE_MGR_INSERT")
    public ResponseEntity<HttpStatus> smsTemplateInsert(@RequestBody @Valid SmsTemplateInsertCommand command){
        smsTemplateService.smsTemplateInsert(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/sms-template")
    @Secured("ROLE_WORK_SMS_TEMPLATE_MGR_UPDATE")
    public ResponseEntity<HttpStatus> smsTemplateUpdate(@RequestBody @Valid SmsTemplateUpdateCommand command){
        smsTemplateService.smsTemplateUpdate(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
