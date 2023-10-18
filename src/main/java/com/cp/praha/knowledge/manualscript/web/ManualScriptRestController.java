package com.cp.praha.knowledge.manualscript.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.knowledge.manualmanager.service.request.ManualInsertCommand;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectPageCommand;
import com.cp.praha.knowledge.manualmanager.service.request.ManualUpdateCommand;
import com.cp.praha.knowledge.manualqna.service.request.ManualSelectQnaCommand;
import com.cp.praha.knowledge.manualqna.service.response.ManualSelectQnaDomain;
import com.cp.praha.knowledge.manualscript.service.ManualScriptService;
import com.cp.praha.knowledge.manualscript.service.response.ManualScriptItemSelItemDomain;
import com.cp.praha.knowledge.manualscript.service.response.ManualScriptItemSelectDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/knowledge/v1")
public class ManualScriptRestController {
    private final ManualScriptService manualScriptService;

    @GetMapping("/script-manual/select/page")
    public GridDomain manualSelectPage(ManualSelectPageCommand command) {
        return manualScriptService.manualSelectPage(command);
    }

    @GetMapping("/script-manual/select/script")
    public List<ManualSelectQnaDomain> qnaManualSelectPage(ManualSelectQnaCommand command) {
        return manualScriptService.manualScriptSelect(command);
    }

    @PutMapping("/script-manual/save")
    @Secured("ROLE_WORK_SCRIPT_MGR_UPDATE")
    public void scriptUpdate(@RequestBody @Valid ManualUpdateCommand manualUpdateCommand) {
        manualScriptService.scriptUpdate(manualUpdateCommand);
    }

    @PostMapping("/script-manual/save")
    @Secured("ROLE_WORK_SCRIPT_MGR_INSERT")
    public void scriptInsert(@RequestBody @Valid ManualInsertCommand manualInsertCommand) {
        manualScriptService.scriptInsert(manualInsertCommand);
    }

    @GetMapping("/manual/script/item/{scriptId}")
    public List<ManualScriptItemSelectDomain> manualScriptItemSelect(@PathVariable("scriptId") int scriptId){
        return manualScriptService.manualScriptItemSelect(scriptId);
    }

    @GetMapping("manual/script/item/sel/{scriptItemUuid}")
    public ManualScriptItemSelItemDomain manualScriptItemSelItem(@PathVariable("scriptItemUuid") String scriptItemUuid){
        return manualScriptService.manualScriptItemSelItem(scriptItemUuid);
    }

}
