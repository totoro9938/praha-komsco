package com.cp.praha.work.callback.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.validation.CustomCollectionValidator;
import com.cp.praha.main.common.entity.AlarmSrcId;
import com.cp.praha.main.common.service.WebSocketService;
import com.cp.praha.work.callback.service.CallbackService;
import com.cp.praha.work.callback.service.request.CallbackDistributionClearCommand;
import com.cp.praha.work.callback.service.request.CallbackDistributionCommand;
import com.cp.praha.work.callback.service.request.CallbackSelectPageCommand;
import com.cp.praha.work.callback.service.request.CallbackUserDstribSelectCommand;
import com.cp.praha.work.callback.service.response.CallbackUserDstribSelectDomain;
import com.cp.praha.work.smsconfig.service.SmsConfigService;
import com.cp.praha.work.smsconfig.service.request.UserAppointSaveCommand;
import com.cp.praha.work.smsconfig.service.response.UserAppointSelectDomain;
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
@Secured("ROLE_WORK_CALLBACK_MGR_SELECT")
public class CallbackRestController {
    private final CallbackService callbackService;
    private final CustomCollectionValidator customCollectionValidator;
    private final WebSocketService webSocketService;
    private final SmsConfigService smsConfigService;

    @GetMapping("/callback/select-page")
    public GridDomain callbackSelectPage(CallbackSelectPageCommand command){
        return callbackService.callbackSelectPage(command);
    }

    @GetMapping("/callback/select/distrib-user")
    public List<CallbackUserDstribSelectDomain> callbackUserDstribSelect(CallbackUserDstribSelectCommand command){
        return callbackService.callbackUserDstribSelect(command);
    }

    @PutMapping("/callback/distribution")
    @Secured("ROLE_WORK_CALLBACK_MGR_UPDATE")
    public ResponseEntity<HttpStatus> callbackDistribution(@RequestBody @Valid CallbackDistributionCommand command){
        callbackService.callbackDistribution(command);

        var srcId1 = AlarmSrcId.CALLBACK;
        webSocketService.alarmSourceSend(srcId1, String.valueOf(0));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/callback/distribution-clear")
    @Secured("ROLE_WORK_CALLBACK_MGR_UPDATE")
    public ResponseEntity<HttpStatus> callbackDistributionClear(@RequestBody @Valid CallbackDistributionClearCommand command){
        callbackService.callbackDistributionClear(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * 콜백알림지정 사용자 조회
     */
    @GetMapping("/callback-config/callback-user/{deptId}")
    public List<UserAppointSelectDomain> callbackUserSelect(@PathVariable int deptId){
        return callbackService.callbackUserSelect(deptId);
    }

    @PutMapping("/callback-config/user/set")
    @Secured("ROLE_WORK_CALLBACK_MGR_UPDATE")
    public ResponseEntity<HttpStatus> smscallUserSet(@RequestBody @Valid List<UserAppointSaveCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors())  smsConfigService.smscallUserSet(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
