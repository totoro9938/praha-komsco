package com.cp.praha.consult.boundlist.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.boundlist.entity.BoundSelectPageProc;
import com.cp.praha.consult.boundlist.entity.BoundSeletItemProc;
import com.cp.praha.consult.boundlist.service.request.BoundSelectPageCommand;
import com.cp.praha.consult.boundlist.service.response.BoundSelectItemDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;

@Service
@Slf4j
@RequiredArgsConstructor
public class BoundListService {

    private final EntityManager entityManager;

    /**
    * USP_BOUND_SEL_PAGE 바운드리스트 조회
    * */
    public GridDomain boundSelectPage(BoundSelectPageCommand command) {
        var procedure = BoundSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
        return gridDomain;
    }

    /**
    * USP_BOUND_SEL_ITEM 바운드리스트 상세 조회
    * */
    public BoundSelectItemDomain boundSelectItem(String boundUuid) {
      var procedure = BoundSeletItemProc.procedureQuery(entityManager,boundUuid);
      ProcErrorHandler.errorHandler(procedure);
      return GenericListType.getObjectType(new TypeReference<>() {},procedure.getSingleResult());
    }
}
