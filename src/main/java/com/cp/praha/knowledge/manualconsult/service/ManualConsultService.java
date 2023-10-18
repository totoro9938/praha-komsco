package com.cp.praha.knowledge.manualconsult.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.knowledge.manualconsult.entity.ManualConsultKeywordSelectProc;
import com.cp.praha.knowledge.manualconsult.entity.ManualConsultSelectPageProc;
import com.cp.praha.knowledge.manualconsult.entity.ManualKeywordCountProc;
import com.cp.praha.knowledge.manualconsult.service.request.ManualConsultKeywordSelectCommand;
import com.cp.praha.knowledge.manualconsult.service.request.ManualConsultSelectPageCommand;
import com.cp.praha.knowledge.manualconsult.service.response.ManualConsultKeywordSelectDomain;
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
public class ManualConsultService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public GridDomain manualConsultSelectPage(ManualConsultSelectPageCommand command) {
        var procedure = ManualConsultSelectPageProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));

        return gridDomain;
    }

    public List<ManualConsultKeywordSelectDomain> manualConsultKeywordSelect(ManualConsultKeywordSelectCommand command){
        var procedure = ManualConsultKeywordSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

    @Transactional
    public void manualKeywordCount(String keyword){
        var procedure = ManualKeywordCountProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), keyword);
        ProcErrorHandler.errorHandler(procedure);
    }
}
