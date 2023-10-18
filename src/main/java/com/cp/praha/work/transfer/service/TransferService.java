package com.cp.praha.work.transfer.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.work.transfer.entity.TransferSelectItemProc;
import com.cp.praha.work.transfer.entity.TransferSelectPageProc;
import com.cp.praha.work.transfer.entity.TransferUpdateProc;
import com.cp.praha.work.transfer.service.request.TransferSelectPageCommand;
import com.cp.praha.work.transfer.service.request.TransferUpdateCommand;
import com.cp.praha.work.transfer.service.response.TransferSelectItemDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;

@Service
@Slf4j
@RequiredArgsConstructor
public class TransferService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;
    private final UserInfo userInfo;

    public GridDomain transferSelectPage(TransferSelectPageCommand command) {
        var procedure = TransferSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        var totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        var curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount(totalCount);
        gridDomain.setCurPage(curPage);
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList()));
        return gridDomain;
    }

    public TransferSelectItemDomain transferSelectItem(String transferUuid) {
        var procedure = TransferSelectItemProc.procedureQuery(entityManager,transferUuid,userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){},procedure.getSingleResult());
    }
    @Transactional
    public void transferUpdate(TransferUpdateCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = TransferUpdateProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

}
