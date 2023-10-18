package com.cp.praha.base.code.service;

import com.cp.praha.base.code.entity.*;
import com.cp.praha.base.code.service.request.*;
import com.cp.praha.base.code.service.response.CodeGroupSelectDomain;
import com.cp.praha.base.code.service.response.CodeSelectDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.config.CacheConstants;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CodeService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;
    private final UserInfo userInfo;

    public List<CodeGroupSelectDomain> codeGroupSelect(CodeGroupSelectCommand command) {
        var procedure = CodeGroupSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_code", allEntries = true)
    public void codeGroupInsert(List<CodeGroupInsertCommand> command) {
        for(CodeGroupInsertCommand codeInsertCommand: command) {
            codeInsertCommand.setRgtrId(userInfo.getUser().getUserId());
            var procedure = CodeGroupInsertProc.procedureQuery(entityManager, codeInsertCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_code", allEntries = true)
    public void codeGroupUpdate(List<CodeGroupUpdateCommand> command) {
        for(CodeGroupUpdateCommand codeUpdateCommand: command) {
            codeUpdateCommand.setMdfrId(userInfo.getUser().getUserId());
            var procedure = CodeGroupUpdateProc.procedureQuery(entityManager, codeUpdateCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    public List<CodeSelectDomain> codeSelect(CodeSelectCommand command) {
        var procedure = CodeSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_code", allEntries = true)
    public void codeInsert(List<CodeInsertCommand> command) {
        for(CodeInsertCommand codeInsertCommand: command) {
            codeInsertCommand.setRgtrId(userInfo.getUser().getUserId());
            var procedure = CodeInsertProc.procedureQuery(entityManager, codeInsertCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_code", allEntries = true)
    public void codeUpdate(List<CodeUpdateCommand> command) {
        for(CodeUpdateCommand codeUpdateCommand: command) {
            codeUpdateCommand.setMdfrId(userInfo.getUser().getUserId());
            var procedure = CodeUpdateProc.procedureQuery(entityManager, codeUpdateCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }
}
