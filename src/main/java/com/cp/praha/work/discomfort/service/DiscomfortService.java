package com.cp.praha.work.discomfort.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.work.discomfort.entity.DiscomfortCenterUserSelProc;
import com.cp.praha.work.discomfort.entity.DiscomfortSelProc;
import com.cp.praha.work.discomfort.service.request.DiscomfortSelCommand;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;


@RequiredArgsConstructor
@Slf4j
@Service
public class DiscomfortService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public GridDomain discomfortSelectPage(DiscomfortSelCommand command) {
        var procedure = DiscomfortSelProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);

        GridDomain gridDomain = new GridDomain();
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        return gridDomain;
    }

    public List<DiscomfortCenterUserSelProc> discomfortCenterUserSel(String deptCenterCd) {
        var procedure = DiscomfortCenterUserSelProc.procedureQuery(entityManager,deptCenterCd);

        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }
}
