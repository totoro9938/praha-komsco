package com.cp.praha.base.failure.web;

import com.cp.praha.base.failure.service.FailureService;
import com.cp.praha.base.failure.service.request.SystemFailureConfirmCommand;
import com.cp.praha.base.failure.service.request.SystemFailureInsertCommand;
import com.cp.praha.base.failure.service.request.SystemFailureSelectCommand;
import com.cp.praha.base.failure.service.request.SystemFailureUpdateCommand;
import com.cp.praha.base.failure.service.response.SystemFailureSelectDomain;
import com.cp.praha.base.failure.service.response.SystemFailureSelectItemDomain;
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
@RequestMapping("/base/v1")
@Secured("ROLE_BASE_SYSTEM_FAILURE_SELECT")
public class FailureRestController {

    private final FailureService failureService;

    @GetMapping("/system-failure/select")
    public List<SystemFailureSelectDomain> systemFailureSelect(SystemFailureSelectCommand command) {
        return failureService.systemFailureSelect(command);
    }

    @GetMapping("/system-failure/item/{systemFailureUuid}")
    public SystemFailureSelectItemDomain systemFailureItem(@PathVariable String systemFailureUuid){
        return failureService.systemFailureItem(systemFailureUuid);
    }
    @Secured("ROLE_BASE_SYSTEM_FAILURE_INSERT")
    @PostMapping("/system-failure/insert")
    public void systemFailureInsert(@RequestBody @Valid SystemFailureInsertCommand command)
    {failureService.systemFailureInsert(command);}

    @Secured("ROLE_BASE_SYSTEM_FAILURE_DELETE")
    @DeleteMapping("/system-failure/delete/{systemFailureUuid}")
    public ResponseEntity<HttpStatus> systemFailureDelete(@PathVariable String systemFailureUuid) {
        failureService.systemFailureDelete(systemFailureUuid);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Secured("ROLE_BASE_SYSTEM_FAILURE_UPDATE")
    @PutMapping("/system-failure/update")
    public void systemFailureUpdate(@RequestBody @Valid SystemFailureUpdateCommand command)
    {failureService.systemFailureUpdate(command);}

    @PostMapping("/system-failure/confirm")
    public void systemFailureConfirm(@RequestBody @Valid SystemFailureConfirmCommand command)
    {failureService.systemFailureConfirm(command);}


}
