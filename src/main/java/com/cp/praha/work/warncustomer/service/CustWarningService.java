package com.cp.praha.work.warncustomer.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.work.warncustomer.entity.CustWarningInsertAdminProc;
import com.cp.praha.work.warncustomer.entity.CustWarningSelItemProc;
import com.cp.praha.work.warncustomer.entity.CustWarningSelPageProc;
import com.cp.praha.work.warncustomer.entity.CustWarningUpdateProc;
import com.cp.praha.work.warncustomer.service.request.CustWarningInsertAdminCommand;
import com.cp.praha.work.warncustomer.service.request.CustWarningSelPageCommand;
import com.cp.praha.work.warncustomer.service.response.CustWarningSelItemDomain;
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
public class CustWarningService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    @Value("${company.name}")
    private String companyCd;

    public GridDomain custWarningSelectPage(CustWarningSelPageCommand command) {
        var procedure = CustWarningSelPageProc.procedureQuery(entityManager,command);
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

    public CustWarningSelItemDomain custWarningSelectItem(int custWarningId) {
        var procedure = CustWarningSelItemProc.procedureQuery(entityManager,custWarningId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getSingleResult());
    }

    @Transactional
    public int custWarningInsertAdmin(CustWarningInsertAdminCommand command){
        command.setRgtrId(userInfo.getUser().getUserId());
        var procedure = CustWarningInsertAdminProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return (int) procedure.getOutputParameterValue("O_CUST_WARNING_ID");
    }

    @Transactional
    public void custWarningUpdate(CustWarningInsertAdminCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = CustWarningUpdateProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }


}
