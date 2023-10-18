package com.cp.praha.work.discomfort.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.work.discomfort.entity.DiscomfortCenterUserSelProc;
import com.cp.praha.work.discomfort.service.DiscomfortService;
import com.cp.praha.work.discomfort.service.request.DiscomfortSelCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/work/v1")
@Secured("ROLE_WORK_DISCOMFORT_LIST_SELECT")
public class DiscomfortRestController {

    private final DiscomfortService discomfortService;

    @GetMapping("discomfort/select")
    public GridDomain discomfortSelect(DiscomfortSelCommand command){
        return discomfortService.discomfortSelectPage(command);
    }

    @GetMapping("discomfort/center-user")
    public List<DiscomfortCenterUserSelProc> discomfortCenterUser(@Param("deptCenterCd") String deptCenterCd){
        return discomfortService.discomfortCenterUserSel(deptCenterCd);
    }
}
