package com.cp.praha.knowledge.manualqna.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.knowledge.manualmanager.entity.ManualSelectPageProc;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectPageCommand;
import com.cp.praha.knowledge.manualqna.entity.ManualDeleteQnaProc;
import com.cp.praha.knowledge.manualqna.entity.ManualInsertQnaProc;
import com.cp.praha.knowledge.manualqna.entity.ManualSelectQnaProc;
import com.cp.praha.knowledge.manualqna.entity.ManualUpdateQnaProc;
import com.cp.praha.knowledge.manualqna.service.request.ManualDeleteQnaCommand;
import com.cp.praha.knowledge.manualqna.service.request.ManualInsertQnaCommand;
import com.cp.praha.knowledge.manualqna.service.request.ManualSelectQnaCommand;
import com.cp.praha.knowledge.manualqna.service.request.ManualUpdateQnaCommand;
import com.cp.praha.knowledge.manualqna.service.response.ManualSelectQnaDomain;
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
public class ManualQnaService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public GridDomain qnaMenualSelectPage(ManualSelectPageCommand manualSelectPageCommand) {
        var procedure = ManualSelectPageProc.procedureQuery(entityManager, manualSelectPageCommand);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));

        return gridDomain;
    }

    public List<ManualSelectQnaDomain> qnaSelect(ManualSelectQnaCommand command){
        var procedure = ManualSelectQnaProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

    @Transactional
    public void qnaInsert(ManualInsertQnaCommand command){
        var procedure = ManualInsertQnaProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void qnaUpdate(ManualUpdateQnaCommand command){
        var procedure = ManualUpdateQnaProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void qnaDelete(ManualDeleteQnaCommand command){
        var procedure = ManualDeleteQnaProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
        ProcErrorHandler.errorHandler(procedure);
    }
}
