package com.cp.praha.work.customer.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.consultmain.entity.CustomerFindSelectProc;
import com.cp.praha.consult.consultmain.service.request.CustomerBlackInsertCommand;
import com.cp.praha.consult.consultmain.service.request.CustomerFindSelectCommand;
import com.cp.praha.consult.consultmain.service.request.CustomerInsertCommand;
import com.cp.praha.consult.consultmain.service.response.CustomerFindSelectDomain;
import com.cp.praha.work.customer.entity.*;
import com.cp.praha.work.customer.service.request.*;
import com.cp.praha.work.customer.service.response.CombinedCustomerItemDomain;
import com.cp.praha.work.customer.service.response.CustomerBlackSelectItemDomain;
import com.cp.praha.work.customer.service.response.CustomerSelectItemDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class CustomerManagerService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    @Value("${company.name}")
    private String companyCd;

    public GridDomain custSelPage(CustomerSelectPageCommand custSelectPageCommand) {
        var procedure = CustomerSelectPageProc.procedureQuery(entityManager, custSelectPageCommand);
        ProcErrorHandler.errorHandler(procedure);
        var totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        var curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount(totalCount);
        gridDomain.setCurPage(curPage);
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>(){}, procedure.getResultList()));

        return gridDomain;
    }


    public CombinedCustomerItemDomain custSelItem(String uuid) {
        var procedure = CustomerSelectItemProc.procedureQuery(entityManager, uuid);
        ProcErrorHandler.errorHandler(procedure);
        var domain = GenericListType.getObjectType(new TypeReference<CustomerSelectItemDomain>(){},procedure.getSingleResult());
        CustomerFindSelectCommand command = new CustomerFindSelectCommand();
        command.setUnitedId(domain.getUnitedCustId());
        var procedure2 = CustomerFindSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure2);
        var domain2 = GenericListType.getObjectType(new TypeReference<List<CustomerFindSelectDomain>>(){}, procedure2.getResultList());
        CombinedCustomerItemDomain combinedCustomerItemDomain = new CombinedCustomerItemDomain();
        combinedCustomerItemDomain.setCustomerSelectItemDomain(domain);
        combinedCustomerItemDomain.setCustomerFindSelectDomain(domain2);
        return combinedCustomerItemDomain;

    }

    @Transactional
    public void custUpt(CustomerUpdateCommand customerUpdateCommand) {
        var procedure = CustomerUpdateProc.procedureQuery(entityManager,userInfo, customerUpdateCommand);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void custIns(CustomerInsertCommand customerInsertCommand) {
        customerInsertCommand.setCustUuid(UUID.randomUUID().toString());
        var procedure = CustomerInsertProc.procedureQuery(entityManager,userInfo,customerInsertCommand);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void custBlackIns(CustomerBlackInsertCommand customerBlackInsertCommand) {
        var procedure = CustomerBlackInsertProc.procedureQuery(entityManager,userInfo,customerBlackInsertCommand);
        ProcErrorHandler.errorHandler(procedure);
    }

    public CustomerBlackSelectItemDomain custBlackSelItem(int custBlackId) {
        var procedure = CustomerBlackSelectItemProc.procedureQuery(entityManager,custBlackId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){}, procedure.getSingleResult());
    }

    public GridDomain custBlackSelPage(CustomerBlackSelectPageCommand customerBlackSelectPageCommand) {
        var procedure = CustomerBlackSelectPageProc.procedureQuery(entityManager, customerBlackSelectPageCommand);
        ProcErrorHandler.errorHandler(procedure);
        var totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        var curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount(totalCount);
        gridDomain.setCurPage(curPage);
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>(){}, procedure.getResultList()));
        return gridDomain;
    }

    @Transactional
    public void custBlackUpt(CustomerBlackUpdateCommand customerBlackUpdateCommand) {
        customerBlackUpdateCommand.setMdfrId(userInfo.getUser().getUserId());
        var procedure = CustomerBlackUpdateProc.procedureQuery(entityManager,customerBlackUpdateCommand);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void custIdUnited(CustomerIdUnitedCommand customerIdUnitedCommand) {
        for (int custId : customerIdUnitedCommand.getTargetCustId()) {
            customerIdUnitedCommand.setMdfrId(userInfo.getUser().getUserId());
            var procedure = CustomerIdUnitedProc.procedureQuery(entityManager,customerIdUnitedCommand, custId);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    public void custIdRelease(CustomerIdReleaseCommand customerIdReleaseCommand) {
        for (int custId : customerIdReleaseCommand.getReleaseCustId()) {
            customerIdReleaseCommand.setMdfrId(userInfo.getUser().getUserId());
            var procedure = CustomerIdReleaseProc.procedureQuery(entityManager,customerIdReleaseCommand, custId);
            ProcErrorHandler.errorHandler(procedure);
        }
    }
}
