package com.cp.praha.base.logbatch.web;

import com.cp.praha.base.logbatch.service.LogBatchService;
import com.cp.praha.base.logbatch.service.request.LogBatchSelectPageCommand;
import com.cp.praha.common.domain.GridDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/base/v1")
@Secured("ROLE_BASE_LOG_BATCH_DEL_SELECT")
public class LogBatchRestController {

    private final LogBatchService logBatchService;


    @GetMapping("/log-batch/select/page")
    public GridDomain logBatchSelectPage(@Valid LogBatchSelectPageCommand command) {
        return logBatchService.logBatchDelSelectPage(command);
    }

}
