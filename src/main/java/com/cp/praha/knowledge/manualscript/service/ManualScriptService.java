package com.cp.praha.knowledge.manualscript.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.knowledge.manualmanager.entity.ManualInsertProc;
import com.cp.praha.knowledge.manualmanager.entity.ManualSelectPageProc;
import com.cp.praha.knowledge.manualmanager.entity.ManualUpdateProc;
import com.cp.praha.knowledge.manualmanager.service.request.ManualInsertCommand;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectPageCommand;
import com.cp.praha.knowledge.manualmanager.service.request.ManualUpdateCommand;
import com.cp.praha.knowledge.manualqna.entity.ManualSelectQnaProc;
import com.cp.praha.knowledge.manualqna.service.request.ManualSelectQnaCommand;
import com.cp.praha.knowledge.manualqna.service.response.ManualSelectQnaDomain;
import com.cp.praha.knowledge.manualscript.entity.ManualScriptItemSelItemProc;
import com.cp.praha.knowledge.manualscript.entity.ManualScriptItemSelectProc;
import com.cp.praha.knowledge.manualscript.service.response.ManualScriptItemSelItemDomain;
import com.cp.praha.knowledge.manualscript.service.response.ManualScriptItemSelectDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor

public class ManualScriptService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public GridDomain manualSelectPage(ManualSelectPageCommand manualSelectPageCommand) {
        var procedure = ManualSelectPageProc.procedureQuery(entityManager, manualSelectPageCommand);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));

        return gridDomain;
    }

    @Transactional
    public void scriptInsert(ManualInsertCommand command) {
        var procedure = ManualInsertProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void scriptUpdate(ManualUpdateCommand command) {
        var procedure = ManualUpdateProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
        ProcErrorHandler.errorHandler(procedure);
    }

    public List<ManualSelectQnaDomain> manualScriptSelect(ManualSelectQnaCommand command){
        var procedure = ManualSelectQnaProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);

        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public List<ManualScriptItemSelectDomain> manualScriptItemSelect(@PathVariable int scriptId){
        var procedure = ManualScriptItemSelectProc.procedureQuery(entityManager,scriptId);
        ProcErrorHandler.errorHandler(procedure);

        return  GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

    public ManualScriptItemSelItemDomain manualScriptItemSelItem(@PathVariable String scriptItemUuid){
        var procedure = ManualScriptItemSelItemProc.procedureQuery(entityManager,scriptItemUuid);
        ProcErrorHandler.errorHandler(procedure);

        return  GenericListType.getObjectType(new TypeReference<>() {},procedure.getSingleResult());
    }



}
