package com.cp.praha.work.transfer.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.main.common.entity.AlarmSrcId;
import com.cp.praha.main.common.service.WebSocketService;
import com.cp.praha.work.transfer.service.TransferService;
import com.cp.praha.work.transfer.service.request.TransferSelectPageCommand;
import com.cp.praha.work.transfer.service.request.TransferUpdateCommand;
import com.cp.praha.work.transfer.service.response.TransferSelectItemDomain;
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
@RequestMapping("/work/v1")
@Secured("ROLE_WORK_TRANSFER_LIST_SELECT")
public class TransferRestController {
    private final TransferService transferService;
    private final UserInfo userInfo;
    private final WebSocketService webSocketService;

    @GetMapping("/transfer/page")
    public GridDomain transferSelectPage(TransferSelectPageCommand command){
        return transferService.transferSelectPage(command);
    }

    @GetMapping("/transfer/item/{transferUuid}")
    public TransferSelectItemDomain transferSelectItem(@PathVariable String transferUuid){
        return transferService.transferSelectItem(transferUuid);
    }

    @PutMapping("/transfer")
    @Secured("ROLE_WORK_TRANSFER_LIST_UPDATE")
    public ResponseEntity<HttpStatus> transferUpdate(@RequestBody @Valid TransferUpdateCommand command){
        transferService.transferUpdate(command);

        var srcId1 = AlarmSrcId.TRANSFER;
        var srcId2 = command.getCallId();

        if(command.getChargeId() != userInfo.getUser().getUserId()){
            webSocketService.alarmSourceSend(srcId1,String.valueOf(srcId2));
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
