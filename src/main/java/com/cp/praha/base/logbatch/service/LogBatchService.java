package com.cp.praha.base.logbatch.service;

import com.cp.praha.base.logbatch.entity.LogBatchSelectPageProc;
import com.cp.praha.base.logbatch.service.request.LogBatchSelectPageCommand;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

@Service
@Slf4j
@RequiredArgsConstructor

public class LogBatchService {
    private final EntityManager entityManager;

    public GridDomain logBatchDelSelectPage(LogBatchSelectPageCommand command) {
        var procedure = LogBatchSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        var totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        var curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount(totalCount);
        gridDomain.setCurPage(curPage);
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList()));

        return gridDomain;
    }
}
