package com.cp.praha.knowledge.manualcallclass.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.knowledge.manualcallclass.service.ManualCallClassService;
import com.cp.praha.knowledge.manualcallclass.service.request.ManualCallClassSelPageCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/knowledge/v1")
public class ManualCallClassRestController {

    private final ManualCallClassService manualCallClassService;

    @GetMapping("/manual/callClass/select")
    public GridDomain manualCallClassSelPage(ManualCallClassSelPageCommand command){
        return manualCallClassService.manualCallClassSelPage(command);
    }
}
