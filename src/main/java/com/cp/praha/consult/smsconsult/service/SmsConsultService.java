package com.cp.praha.consult.smsconsult.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.smsconsult.entity.*;
import com.cp.praha.consult.smsconsult.service.request.SmsRvOneSelectPageCommand;
import com.cp.praha.consult.smsconsult.service.request.SmsRvSelectPageCommand;
import com.cp.praha.consult.smsconsult.service.request.SmsRvSmsInserCommand;
import com.cp.praha.consult.smsconsult.service.request.SmsSpamTelNoInsertCommand;
import com.cp.praha.consult.smsconsult.service.response.SmsRvContentsSelectDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SmsConsultService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public GridDomain smsRvSelectPage(SmsRvSelectPageCommand command) {
        var procedure = SmsRvSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
        return gridDomain;
    }

    public GridDomain smsRvOneSelectPage(SmsRvOneSelectPageCommand command) {
        var procedure = SmsRvOneSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
        return gridDomain;
    }

    public List<SmsRvContentsSelectDomain> smsRvSelectItem(String smsRvId) {
        var procedure = SmsRvContentsSelectProc.procedureQuery(entityManager,smsRvId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

    @Transactional
    public void smsRvAllocate(String smsMid) {
        ProcErrorHandler.errorHandler(SmsRvAllocateProc.procedureQuery(entityManager,userInfo,smsMid));
    }
    @Transactional
    public void smsRvAllocateReleased(String smsRvId) {
        ProcErrorHandler.errorHandler(SmsRvFreeProc.procedureQuery(entityManager,userInfo,smsRvId));
    }
    @Transactional
    public void smsSpamInsert(SmsSpamTelNoInsertCommand command) {
        ProcErrorHandler.errorHandler(SmsSpamTelInsertProc.procedureQuery(entityManager,userInfo,command));
    }
    @Transactional
    public void smsSpamRelease(String uuid) {
        ProcErrorHandler.errorHandler(SmsSpamTelNoUpdateProc.procedureQuery(entityManager,userInfo,uuid));
    }
    @Transactional
    public void smsSend(SmsRvSmsInserCommand command) {
        ProcErrorHandler.errorHandler(SmsRvSmsInserProc.procedureQuery(entityManager,userInfo,command));
    }
    @Transactional
    public void smsSkip(String smsRvId) {
        ProcErrorHandler.errorHandler(SmsSkipProc.procedureQuery(entityManager,userInfo,smsRvId));
    }
}
