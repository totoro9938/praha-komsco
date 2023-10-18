package com.cp.praha.consult.consultmain.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.consultmain.entity.*;
import com.cp.praha.consult.consultmain.service.request.*;
import com.cp.praha.consult.consultmain.service.response.*;
import com.cp.praha.consult.smslist.entity.SmsInsertProc;
import com.cp.praha.consult.smslist.service.request.SmsInsertCommand;
import com.cp.praha.work.customer.entity.CustomerBlackInsertProc;
import com.cp.praha.work.customer.entity.CustomerInsertProc;
import com.cp.praha.work.customer.entity.CustomerUpdateProc;
import com.cp.praha.work.customer.service.request.CustomerUpdateCommand;
import com.cp.praha.work.shortcut.entity.ShortcutSelectProc;
import com.cp.praha.work.shortcut.service.request.ShortCutSelectCommand;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor

public class ConsultService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;
    public List<CustomerFindSelectDomain> customerFindSelect(CustomerFindSelectCommand command) {
        var procedure = CustomerFindSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }
    public List<CustomerCallTabSelectDomain> customerCallTabSelect(CustomerCallTabSelectCommand command) {
        var procedure = CustomerCallTabSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }
    @Transactional
    public void costomerBlackInsert(CustomerBlackInsertCommand command) {
        ProcErrorHandler.errorHandler(CustomerBlackInsertProc.procedureQuery(entityManager,userInfo,command));
    }
    @Transactional
    public int customerInsert(CustomerInsertCommand command) {
        command.setCustUuid(UUID.randomUUID().toString());
        var procedure = CustomerInsertProc.procedureQuery(entityManager,userInfo,command);
        ProcErrorHandler.errorHandler(procedure);
        return (int)procedure.getOutputParameterValue("V_CUST_ID");
    }
    @Transactional
    public void customerUpdate(CustomerUpdateCommand command) {
        ProcErrorHandler.errorHandler(CustomerUpdateProc.procedureQuery(entityManager,userInfo,command));
    }
    public List<ReservationAgentSelectDomain> reservationAgentSelect(UserDddCommand command) {
        var procedure = ReservationAgentSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }
    public List<SmsTemplateSelectDomain> smsTemplateSelect(int templateId) {
        var procedure = SmsTemplateSelectProc.procedureQuery(entityManager,templateId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }
    @Transactional
    public void consultSmsInsert(SmsInsertCommand command) {
        ProcErrorHandler.errorHandler(SmsInsertProc.procedureQuery(entityManager,userInfo,command));
    }
    @Transactional
    public int callInsert(ConusltCallInsertCommand command,String ip){
        if(command.getCallStartDt().isBlank())command.setCallStartDt(null);
        if(command.getCallEndDt().isBlank())command.setCallEndDt(null);
        int custId;
        log.info("callInsert custId => {} ",command.getCustCommand().getCustId());
        if(command.getCustCommand().getCustId() == null){
            CustomerInsertCommand custInserCommand = new CustomerInsertCommand();
            custInserCommand.setCustUuid(UUID.randomUUID().toString());
            custInserCommand.setCustNm(command.getCustCommand().getCustNm());
            custInserCommand.setTelNo(command.getCustCommand().getTelNo());
            custInserCommand.setBoundTelNo(command.getCustCommand().getBoundTelNo());
            custInserCommand.setHpNo(command.getCustCommand().getHpNo());
            custInserCommand.setDescription(command.getCustCommand().getDescription());
            custInserCommand.setSmsYn(command.getCustCommand().getSmsYn());
            custInserCommand.setTelYn(command.getCustCommand().getTelYn());
            custId = this.customerInsert(custInserCommand);
        }else{
            custId = command.getCustCommand().getCustId();
            this.customerUpdate(command.getCustCommand());
        }
        command.setCustId(custId);
        command.setCustNm(command.getCustCommand().getCustNm());
        var procedure = CallInsertProc.procedureQuery(entityManager,userInfo,command,ip);
        ProcErrorHandler.errorHandler(procedure);
        return (Integer) procedure.getOutputParameterValue("O_CALL_ID");
    }
    public GridDomain userFindPage(UserFindPageCommand command) {
        var procedure = UserFindPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setCurPage((int) procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setTotalCount((int) procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
        return gridDomain;
    }
    @Transactional
    public int boundInsert(BoundInsertCommand command, String ip) {
        var procedure = BoundInsertProc.procedureQuery(entityManager,userInfo,command,ip);
        ProcErrorHandler.errorHandler(procedure);
        return (Integer) procedure.getOutputParameterValue("O_BOUND_ID");
    }
    @Transactional
    public void boundUpdate(BoundUpdateCommand command, String ip) {
        var procedure = BoundUpdateProc.procedureQuery(entityManager,userInfo,command,ip);
        ProcErrorHandler.errorHandler(procedure);
    }

    public List<ShortcutSelectDomain> shortCutSel(ShortCutSelectCommand command) {
        var procedure = ShortcutSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList());
    }

    @Transactional
    public void custWaringInsert(CustWarningInsCommand command) {
        command.setRgtrId(userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(CustWarningInsProc.procedureQuery(entityManager,command));
    }
}
