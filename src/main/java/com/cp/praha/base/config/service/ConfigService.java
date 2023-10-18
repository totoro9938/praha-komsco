package com.cp.praha.base.config.service;

import com.cp.praha.base.config.entity.ConfigInsertProc;
import com.cp.praha.base.config.entity.ConfigSelectProc;
import com.cp.praha.base.config.entity.ConfigUpdateProc;
import com.cp.praha.base.config.service.request.ConfigInsertCommand;
import com.cp.praha.base.config.service.request.ConfigSelectCommand;
import com.cp.praha.base.config.service.request.ConfigUpdateCommand;
import com.cp.praha.base.config.service.response.ConfigSelectDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@SuppressWarnings("ALL")
@Service
@Slf4j
@RequiredArgsConstructor
public class ConfigService {
  private final EntityManager entityManager;
  private final UserInfo userInfo;

  @Value("${company.name}")
  private String companyName;

  public List<ConfigSelectDomain> configSelect(ConfigSelectCommand command) {
   var procedure = ConfigSelectProc.procedureQuery(entityManager, command);
    ProcErrorHandler.errorHandler(procedure);
    return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
  }

  @Transactional
  public void configInsert(List<ConfigInsertCommand> command) {
    for(ConfigInsertCommand configInsCommand : command) {
      configInsCommand.setRgtrId(userInfo.getUser().getUserId());
      var procedure = ConfigInsertProc.procedureQuery(entityManager, configInsCommand);
      ProcErrorHandler.errorHandler(procedure);
    }
  }

  @Transactional
  public void configUpdate(List<ConfigUpdateCommand> command) {
    for(ConfigUpdateCommand configUptCommand : command) {
      configUptCommand.setMdfrId(userInfo.getUser().getUserId());
      var procedure = ConfigUpdateProc.procedureQuery(entityManager, configUptCommand);
      ProcErrorHandler.errorHandler(procedure);
    }
  }
}