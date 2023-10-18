package com.cp.praha.work.warncustomer.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.work.warncustomer.service.CustWarningService;
import com.cp.praha.work.warncustomer.service.request.CustWarningInsertAdminCommand;
import com.cp.praha.work.warncustomer.service.request.CustWarningSelPageCommand;
import com.cp.praha.work.warncustomer.service.response.CustWarningSelItemDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/work/v1")
@Secured("ROLE_WORK_WARN_CUST_MGR_SELECT")
public class WarnCustomerRestController {
    private final CustWarningService custWarningService;

    @GetMapping("/warn-customer/select/page")
    public GridDomain noticeSelectPage(CustWarningSelPageCommand command) {
        return custWarningService.custWarningSelectPage(command);
    }

    @GetMapping("/warn-customer/select/item/{custWarningId}")
    @Secured("ROLE_WORK_WARN_CUST_MGR_SELECT")
    public CustWarningSelItemDomain noticeSelectItem(@PathVariable int custWarningId) {
        return custWarningService.custWarningSelectItem(custWarningId);
    }

    @PostMapping("/warn-customer/insert/admin")
    @Secured("ROLE_WORK_WARN_CUST_MGR_INSERT")
    public int custWarningInsertAdmin(@RequestBody @Valid CustWarningInsertAdminCommand command){
        return custWarningService.custWarningInsertAdmin(command);
    }

    @PutMapping("/warn-customer/process-update")
    @Secured("ROLE_WORK_WARN_CUST_MGR_UPDATE")
    public void custWarningUpdate(@RequestBody @Valid CustWarningInsertAdminCommand command){
        custWarningService.custWarningUpdate(command);
    }

}
