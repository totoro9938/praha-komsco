package com.cp.praha.work.smsconfig.web;

import com.cp.praha.base.config.service.ConfigService;
import com.cp.praha.base.config.service.request.ConfigUpdateCommand;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.validation.CustomCollectionValidator;
import com.cp.praha.work.smsconfig.service.SmsConfigService;
import com.cp.praha.work.smsconfig.service.request.SmsSpamTelNoSelectPageCommand;
import com.cp.praha.work.smsconfig.service.request.UserAppointSaveCommand;
import com.cp.praha.work.smsconfig.service.response.SmsSpamTelNoSelectItemDomain;
import com.cp.praha.work.smsconfig.service.response.UserAppointSelectDomain;
import com.cp.praha.work.smstemaplate.service.SmsTemplateService;
import com.cp.praha.work.smstemaplate.service.request.SmsTemplateUpdateCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/work/v1")
@Secured("ROLE_WORK_SMS_CONFIG_MGR_SELECT")
public class SmsConfigRestController {
    private final CustomCollectionValidator customCollectionValidator;
    private final SmsConfigService smsConfigService;
    private final ConfigService configService;
    private final SmsTemplateService smsTemplateService;

    @GetMapping("/sms-config/sms-user/{deptId}")
    public List<UserAppointSelectDomain> smscallUserSelect(@PathVariable int deptId){
        return smsConfigService.smscallUserSelect(deptId);
    }
    @PutMapping("/sms-config/user/set")
    @Secured("ROLE_WORK_SMS_CONFIG_MGR_UPDATE")
    public ResponseEntity<HttpStatus> smscallUserSet(@RequestBody @Valid List<UserAppointSaveCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors())  smsConfigService.smscallUserSet(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/sms-config/spam-list")
    public GridDomain smsSpamSelectPage(SmsSpamTelNoSelectPageCommand command){
        return smsConfigService.smsSpamSelectPage(command);
    }
    @GetMapping("/sms-config/spam-item/{uuid}")
    public SmsSpamTelNoSelectItemDomain smsSpamSelectItem(@PathVariable String uuid){
        return smsConfigService.smsSpamSelectItem(uuid);
    }

    @PutMapping("/sms-config/spam-release/{uuid}")
    @Secured("ROLE_WORK_SMS_CONFIG_MGR_UPDATE")
    public ResponseEntity<HttpStatus> smsSpamRelease(@PathVariable String uuid){
        smsConfigService.smsSpamRelease(uuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/sms-config/config-update")
    @Secured("ROLE_WORK_SMS_CONFIG_MGR_UPDATE")
    public ResponseEntity<HttpStatus> configUpdate(@RequestBody @Valid List<ConfigUpdateCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors())  configService.configUpdate(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/sms-config/template-update")
    @Secured("ROLE_WORK_SMS_CONFIG_MGR_UPDATE")
    public ResponseEntity<HttpStatus> templateUpdate(@RequestBody @Valid List<SmsTemplateUpdateCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors())  smsTemplateService.templateUpdate(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
