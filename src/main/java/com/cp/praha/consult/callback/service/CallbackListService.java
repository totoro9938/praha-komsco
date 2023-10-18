package com.cp.praha.consult.callback.service;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.callback.entity.*;
import com.cp.praha.consult.callback.service.request.CallbackUpdateCommand;
import com.cp.praha.consult.callback.service.request.VisitorCallbackInsertCommand;
import com.cp.praha.consult.callback.service.response.CallbackOverlapSelecDomain;
import com.cp.praha.consult.callback.service.response.CallbackSelectItemDomain;
import com.cp.praha.consult.callback.service.response.VisitorCallbackSelectDomain;
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
public class CallbackListService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public CallbackSelectItemDomain callbackSelectItem(String callbackUuid) {
        var procedure = CallbackSelectItemProc.procedureQuery(entityManager,callbackUuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getSingleResult());
    }

    public List<CallbackOverlapSelecDomain> callbackOverlapSelec(int callbackId) {
        var procedure = CallbackOverlapSelecProc.procedureQuery(entityManager, callbackId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }


    public List<VisitorCallbackSelectDomain> visitorCallbackSelect(int callbackId) {
        var procedure = VisitorCallbackSelectProc.procedureQuery(entityManager,callbackId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

    @Transactional
    public void callbackUpdate(CallbackUpdateCommand command) {
        var procedure = CallbackUpdateProc.procedureQuery(entityManager,userInfo,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void visitorCallbackInsert(VisitorCallbackInsertCommand command , String ip) {
        var procedure = VisitorCallbackInsertProc.procedureQuery(entityManager,userInfo,command,ip);
        ProcErrorHandler.errorHandler(procedure);
    }
}
