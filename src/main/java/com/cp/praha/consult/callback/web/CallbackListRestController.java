package com.cp.praha.consult.callback.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.util.IpUtil;
import com.cp.praha.consult.callback.service.CallbackListService;
import com.cp.praha.consult.callback.service.request.CallbackUpdateCommand;
import com.cp.praha.consult.callback.service.request.VisitorCallbackInsertCommand;
import com.cp.praha.consult.callback.service.response.CallbackOverlapSelecDomain;
import com.cp.praha.consult.callback.service.response.CallbackSelectItemDomain;
import com.cp.praha.consult.callback.service.response.VisitorCallbackSelectDomain;
import com.cp.praha.work.callback.service.CallbackService;
import com.cp.praha.work.callback.service.request.CallbackDistributionClearCommand;
import com.cp.praha.work.callback.service.request.CallbackDistributionCommand;
import com.cp.praha.work.callback.service.request.CallbackSelectPageCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/consult/v1")
@Secured("ROLE_CONSULT_CALLBACK_LIST_SELECT")
public class CallbackListRestController {
    private final CallbackService callbackMgrService;
    private final CallbackListService callbackListService;

    @GetMapping("/callback/{callbackUuid}")
    public CallbackSelectItemDomain callbackSelectItem(@PathVariable String callbackUuid){
        return callbackListService.callbackSelectItem(callbackUuid);
    }

    @GetMapping("/callback/list/select-page")
    public GridDomain callbackListSelectPage(CallbackSelectPageCommand command){
        return callbackMgrService.callbackSelectPage(command);
    }

    @GetMapping("/callback/overlap-select/{callbackId}")
    public List<CallbackOverlapSelecDomain> callbackOverlapSelec(@PathVariable int callbackId){
        return callbackListService.callbackOverlapSelec(callbackId);
    }
    @GetMapping("/callback/visitor-select/{callbackId}")
    public List<VisitorCallbackSelectDomain> visitorCallbackSelect(@PathVariable int callbackId){
        return callbackListService.visitorCallbackSelect(callbackId);
    }
    @PutMapping("/callback/distribution")
    @Secured("ROLE_CONSULT_CALLBACK_LIST_UPDATE")
    public ResponseEntity<HttpStatus> callbackListDistribution(@RequestBody @Valid CallbackDistributionCommand command){
        callbackMgrService.callbackDistribution(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/callback/distribution-clear")
    @Secured("ROLE_CONSULT_CALLBACK_LIST_UPDATE")
    public ResponseEntity<HttpStatus> callbackListDistributionClear(@RequestBody @Valid CallbackDistributionClearCommand command){
        callbackMgrService.callbackDistributionClear(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PutMapping("/callback")
    @Secured("ROLE_CONSULT_CALLBACK_LIST_UPDATE")
    public ResponseEntity<HttpStatus> callbackUpdate(@RequestBody @Valid CallbackUpdateCommand command){
        callbackListService.callbackUpdate(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @PostMapping("/callback/visitor-insert")
    @Secured("ROLE_CONSULT_CALLBACK_LIST_INSERT")
    public ResponseEntity<HttpStatus> visitorCallbackInsert(HttpServletRequest request, @RequestBody @Valid VisitorCallbackInsertCommand command){
        String ip = IpUtil.getClientIP(request);
        callbackListService.visitorCallbackInsert(command,ip);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
