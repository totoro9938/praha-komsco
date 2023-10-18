package com.cp.praha.knowledge.manualrelation.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.knowledge.manualmanager.entity.ManualSelectPageProc;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectPageCommand;
import com.cp.praha.knowledge.manualrelation.entity.ManualRelationDeleteProc;
import com.cp.praha.knowledge.manualrelation.entity.ManualRelationInsertProc;
import com.cp.praha.knowledge.manualrelation.entity.ManualRelationSelectProc;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationDeleteCommand;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationInsertCommand;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationSelectCommand;
import com.cp.praha.knowledge.manualrelation.service.response.ManualRelationSelectDomain;
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
public class ManualRelationService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public GridDomain manualRelSelectPage(ManualSelectPageCommand command) {
        var procedure = ManualSelectPageProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));

        return gridDomain;
    }


    public List<ManualRelationSelectDomain> manualRelSelect(ManualRelationSelectCommand command){
        var procedure = ManualRelationSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }


    @Transactional
    public void manualRelInsert(ManualRelationInsertCommand command) {
        for (int manualRelationId : command.getRelationManualIds()) {
            var procedure = ManualRelationInsertProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command, manualRelationId);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    public void manualRelDelete(ManualRelationDeleteCommand command) {
        for (int manualRelationId : command.getRelationManualIds()) {
            var procedure = ManualRelationDeleteProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command, manualRelationId);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

}
