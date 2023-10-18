package com.cp.praha.base.config.web;

import com.cp.praha.base.config.service.ConfigService;
import com.cp.praha.base.config.service.request.ConfigInsertCommand;
import com.cp.praha.base.config.service.request.ConfigSelectCommand;
import com.cp.praha.base.config.service.request.ConfigUpdateCommand;
import com.cp.praha.base.config.service.response.ConfigSelectDomain;
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
@Secured("ROLE_BASE_CONFIG_MGR_SELECT")
public class ConfigRestController {
  private final CustomCollectionValidator customCollectionValidator;
  private final ConfigService configService;
  private final UserInfo userInfo;

  @GetMapping("/config")
  public  List<ConfigSelectDomain> configSelect(ConfigSelectCommand command){
    return  configService.configSelect(command);
  }

  @PostMapping("/config")
  @Secured("ROLE_BASE_CONFIG_MGR_INSERT")
  public ResponseEntity<HttpStatus> configInsert(@RequestBody @Valid List<ConfigInsertCommand> command, BindingResult bindingResult) throws BindException {
    customCollectionValidator.validate(command, bindingResult);

    if(!bindingResult.hasErrors()) configService.configInsert(command);
    else throw new BindException(bindingResult);

    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PutMapping("/config")
  @Secured("ROLE_BASE_CONFIG_MGR_UPDATE")
  public ResponseEntity<HttpStatus> configUpdate(@RequestBody @Valid List<ConfigUpdateCommand> command, BindingResult bindingResult) throws BindException {
    customCollectionValidator.validate(command, bindingResult);

    if(!bindingResult.hasErrors()) configService.configUpdate(command);
    else throw new BindException(bindingResult);

    return new ResponseEntity<>(HttpStatus.OK);
  }

}
