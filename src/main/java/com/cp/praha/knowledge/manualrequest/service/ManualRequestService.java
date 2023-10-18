package com.cp.praha.knowledge.manualrequest.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.knowledge.manualrequest.entity.ManualRequestInsertProc;
import com.cp.praha.knowledge.manualrequest.entity.ManualRequestRejectProc;
import com.cp.praha.knowledge.manualrequest.entity.ManualRequestSelectItemProc;
import com.cp.praha.knowledge.manualrequest.entity.ManualRequestSelectPageProc;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestInsertCommand;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestRejectCommand;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestSelectItemCommand;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestSelectPageCommand;
import com.cp.praha.knowledge.manualrequest.service.response.ManualRequestSelectItemDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Service
@Slf4j
@RequiredArgsConstructor
public class ManualRequestService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    @Transactional
    public void manualRequestInsert(ManualRequestInsertCommand command) {
        var procedure = ManualRequestInsertProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
        ProcErrorHandler.errorHandler(procedure);
    }

    public ManualRequestSelectItemDomain manualRequestSelectItem(ManualRequestSelectItemCommand command) {
        var procedure = ManualRequestSelectItemProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return (ManualRequestSelectItemDomain) procedure.getSingleResult();
    }

    public GridDomain manualRequestSelectPage(ManualRequestSelectPageCommand command) {
        var procedure = ManualRequestSelectPageProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
        return gridDomain;
    }

    @Transactional
    public void manualRequestReject(ManualRequestRejectCommand commdn) {
        var procedure = ManualRequestRejectProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), commdn);
        ProcErrorHandler.errorHandler(procedure);
    }

}
