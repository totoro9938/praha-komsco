package com.cp.praha.work.transfer.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@RequiredArgsConstructor
@Controller
@Secured("ROLE_WORK_TRANSFER_LIST_SELECT")
public class TransferController {

    @GetMapping("/transfer")
    public String smsListPage(){
        return "work/transfer";
    }
}
