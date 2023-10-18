package com.cp.praha.base.failure.service;

import com.cp.praha.base.failure.entity.*;
import com.cp.praha.base.failure.service.request.SystemFailureConfirmCommand;
import com.cp.praha.base.failure.service.request.SystemFailureInsertCommand;
import com.cp.praha.base.failure.service.request.SystemFailureSelectCommand;
import com.cp.praha.base.failure.service.request.SystemFailureUpdateCommand;
import com.cp.praha.base.failure.service.response.SystemFailureSelectDomain;
import com.cp.praha.base.failure.service.response.SystemFailureSelectItemDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor

public class FailureService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public List<SystemFailureSelectDomain> systemFailureSelect(SystemFailureSelectCommand command) {
        var procedure = SystemFailureSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

    public SystemFailureSelectItemDomain systemFailureItem(String systemFailureUuid){
        var procedure = SystemFailureSelectItemProc.procedureQuery(entityManager,systemFailureUuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getSingleResult());
    }

    @Transactional
    public void systemFailureInsert(SystemFailureInsertCommand command) {
        command.setSystemFailureUuid(UUID.randomUUID().toString());
        command.setRgtrId(userInfo.getUser().getUserId());
        var procedure = SystemFailureInsertProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void systemFailureDelete(String systemFailureUuid) {
        var procedure = SystemFailureDeleteProc.procedureQuery(entityManager, systemFailureUuid, userInfo);
        ProcErrorHandler.errorHandler(procedure);

    }
    @Transactional
    public void systemFailureUpdate(SystemFailureUpdateCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = SystemFailureUpdateProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void systemFailureConfirm(SystemFailureConfirmCommand command) {
        command.setConfirmId(userInfo.getUser().getUserId());
        var procedure = SystemFailureConfirmProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
    }
}
