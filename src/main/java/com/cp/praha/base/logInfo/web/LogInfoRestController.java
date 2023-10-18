package com.cp.praha.base.logInfo.web;

import com.cp.praha.base.logInfo.service.LogInformationService;
import com.cp.praha.base.logInfo.service.request.*;
import com.cp.praha.base.logbatch.service.request.LogBatchSelectPageCommand;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/base/v1")
@Secured("ROLE_PEPORT_LOG_LIST_SELECT")
public class LogInfoRestController {
    private final LogInformationService logInformationService;
    private final UserInfo userInfo;

    @GetMapping("/log/select/login")
    public GridDomain logInfoLoginSelect(LogInfoLoginSelectCommand logInfoLoginSelectCommand){
        return logInformationService.getLoginSelect(logInfoLoginSelectCommand, userInfo);
    }
    @GetMapping("/log/select/acl")
    public GridDomain logInfoAclSelect(LogInfoAclSelectPageCommand command) {
        return logInformationService.getAclSelect(command, userInfo);
    }

    @GetMapping("/log/select/user")
    public GridDomain logInfoUserSelect(LogInfoUserSelectCommand logInfoUserSelectCommand){
        return logInformationService.getUserSelect(logInfoUserSelectCommand, userInfo);
    }

    @GetMapping("/log/select/group")
    public GridDomain logInfoGroupSelect(LogInfoGroupSelectCommand logInfoGroupSelectCommand){
        return logInformationService.getGroupSelect(logInfoGroupSelectCommand, userInfo);
    }

    @GetMapping("/log/select/excel")
    public GridDomain logInfoExcelSelect(LogInfoExcelDownSelectCommand logInfoExcelDownSelectCommand){
        return logInformationService.getExcelSelect(logInfoExcelDownSelectCommand, userInfo);
    }

    @GetMapping("/log/select/private")
    public GridDomain logInfoPrivateSelect(LogInfoPrivateSelectCommand logInfoPrivateSelectCommand){
        return logInformationService.getPrivateSelect(logInfoPrivateSelectCommand, userInfo);
    }

    @GetMapping("/log/select/delete")
    public GridDomain logInfoDeleteSelect(LogBatchSelectPageCommand command) {
        return logInformationService.getDeleteSelect(command);
    }
}