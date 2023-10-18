package com.cp.praha.consult.smslist.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.consult.smslist.service.SmsListService;
import com.cp.praha.consult.smslist.service.request.SmsInsertCommand;
import com.cp.praha.consult.smslist.service.request.SmsSelectPageCommand;
import com.cp.praha.consult.smslist.service.response.SmsSelectItemDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/consult/v1")
@Secured("ROLE_CONSULT_SMS_LIST_SELECT")
public class SmsListRestController {

    private final SmsListService smsListService;
    private final UserInfo userInfo;

    @GetMapping("/sms-list/select/page")
    public GridDomain smsListSelectPage(@Valid SmsSelectPageCommand smsSelectPageCommand){
        return smsListService.getSmsListSelectPage(smsSelectPageCommand);
    }

    @GetMapping("/sms-list/select/item/{smsUuid}")
    public SmsSelectItemDomain smsListSelectItem(@PathVariable String smsUuid) {
        return smsListService.smsListSelectItem(smsUuid);
    }

    @PostMapping("/sms-list/insert/re-send")
    @Secured("ROLE_CONSULT_SMS_LIST_INSERT")
    public ResponseEntity<HttpStatus> smsListInsertReSend(@RequestBody @Valid SmsInsertCommand smsInsertCommand){
        smsListService.smsListInsertReSend(smsInsertCommand, userInfo);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
