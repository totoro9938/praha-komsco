package com.cp.praha.base.program.web;


import com.cp.praha.base.program.entity.ProgramSelectProc;
import com.cp.praha.base.program.service.ProgramManagementService;
import com.cp.praha.base.program.service.request.*;
import com.cp.praha.base.program.service.response.ProgramSelectDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.validation.CustomCollectionValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/base/v1")
@Secured("ROLE_BASE_PROGRAM_MGR_SELECT")
public class ProgramRestController {

    private final CustomCollectionValidator customCollectionValidator;
    private final ProgramManagementService programManagementService;
    private final UserInfo userInfo;

    @GetMapping("/program/select")
    @Secured("ROLE_BASE_PROGRAM_MGR_SELECT")
    public List<ProgramSelectDomain> programSelect(@Valid ProgramSelectCommand programSelCommand){
        return programManagementService.getProgramSelect(programSelCommand);
    }

    @GetMapping("/program/select/{item}")
    public List<ProgramSelectProc> programSelectItem(ProgramSelectItemCommand programSelItemCommand){
        return programManagementService.getProgramSelectItem(programSelItemCommand);
    }

    @PutMapping("/program/update")
    @Secured("ROLE_BASE_PROGRAM_MGR_UPDATE")
    public ResponseEntity<HttpStatus> programUpdate(@RequestBody @Valid List<ProgramUpdateCommand> programUptCommands, BindingResult bindingResult) throws BindException{

        customCollectionValidator.validate(programUptCommands, bindingResult);

        if(bindingResult.hasErrors()){
            throw new BindException(bindingResult);
        }else{
            programManagementService.programUpdate(programUptCommands, userInfo);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PostMapping("/program/insert")
    @Secured("ROLE_BASE_PROGRAM_MGR_INSERT")
    public ResponseEntity<HttpStatus> programInsert(@RequestBody @Valid List<ProgramInsertCommand> programInsCommands, BindingResult bindingResult) throws BindException {

        customCollectionValidator.validate(programInsCommands, bindingResult);

        if(bindingResult.hasErrors()){
            throw new BindException(bindingResult);
        }else{
            programManagementService.programInsert(programInsCommands, userInfo);
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PutMapping("/program/program-move")
    @Secured("ROLE_BASE_PROGRAM_MGR_UPDATE")
    public ResponseEntity<HttpStatus> categoryMove(@RequestBody @Valid ProgramMoveCommand command){
        programManagementService.programMove(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
