package com.cp.praha.knowledge.manualexpectation.web;


import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.knowledge.manualmanager.service.ManualManagerService;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectItemCommand;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectPageCommand;
import com.cp.praha.knowledge.manualmanager.service.response.ManualSelectItemDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/knowledge/v1")
@Secured("ROLE_CONSULT_MANUAL_EXPECTATION_SELECT")
public class ExpectationRestController {

    private final ManualManagerService manualManagerService;


    @GetMapping("/manual/expectation/select")
    public GridDomain manualSelectPage(ManualSelectPageCommand manualSelectPageCommand) {
        return manualManagerService.manualSelectPage(manualSelectPageCommand);
    }

    @GetMapping("/expectation-item/select")
    public ManualSelectItemDomain expectationSelectItem(ManualSelectItemCommand manualSelectItemCommand) {
        return manualManagerService.manualSelectItem(manualSelectItemCommand);
    }
}
