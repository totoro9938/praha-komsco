package com.cp.praha.base.code.web;

import com.cp.praha.base.code.service.CodeService;
import com.cp.praha.base.code.service.request.*;
import com.cp.praha.base.code.service.response.CodeGroupSelectDomain;
import com.cp.praha.base.code.service.response.CodeSelectDomain;
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
@Secured("ROLE_BASE_CODE_MGR_SELECT")
public class CodeRestController {
    private final CustomCollectionValidator customCollectionValidator;
    private final CodeService codeService;

    @GetMapping("/code/group")
    public List<CodeGroupSelectDomain> codeGroupSelect(CodeGroupSelectCommand command){
        return codeService.codeGroupSelect(command);
    }

    @PostMapping("/code/group")
    @Secured("ROLE_BASE_CODE_MGR_INSERT")
    public ResponseEntity<HttpStatus> codeGroupInsert(@RequestBody @Valid List<CodeGroupInsertCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors()) codeService.codeGroupInsert(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/code/group")
    @Secured("ROLE_BASE_CODE_MGR_UPDATE")
    public ResponseEntity<HttpStatus> codeGroupUpdate(@RequestBody @Valid List<CodeGroupUpdateCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors()) codeService.codeGroupUpdate(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/code")
    public List<CodeSelectDomain> codeSelect(CodeSelectCommand command){
        return codeService.codeSelect(command);
    }

    @PostMapping("/code")
    @Secured("ROLE_BASE_CODE_MGR_INSERT")
    public ResponseEntity<HttpStatus> codeInsert(@RequestBody @Valid List<CodeInsertCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors()) codeService.codeInsert(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/code")
    @Secured("ROLE_BASE_CODE_MGR_INSERT")
    public ResponseEntity<HttpStatus> codeUpdate(@RequestBody @Valid List<CodeUpdateCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors()) codeService.codeUpdate(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
