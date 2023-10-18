package com.cp.praha.consult.smslist.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.smslist.entity.SmsInsertProc;
import com.cp.praha.consult.smslist.entity.SmsSelectItemProc;
import com.cp.praha.consult.smslist.entity.SmsSelectPageProc;
import com.cp.praha.consult.smslist.service.request.SmsInsertCommand;
import com.cp.praha.consult.smslist.service.request.SmsSelectPageCommand;
import com.cp.praha.consult.smslist.service.response.SmsSelectItemDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class SmsListService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public GridDomain getSmsListSelectPage(SmsSelectPageCommand smsSelectPageCommand){
        var procedure = SmsSelectPageProc.procedureQuery(entityManager,smsSelectPageCommand);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain gridDomain = new GridDomain();
        gridDomain.setCurPage((int)procedure.getOutputParameterValue("V_CUR_PAGE"));
        gridDomain.setTotalCount((int)procedure.getOutputParameterValue("V_TOTALCOUNT"));
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
        return gridDomain;
    }

    public SmsSelectItemDomain smsListSelectItem(String uuid) {
        var procedure = SmsSelectItemProc.procedureQuery(entityManager,uuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getSingleResult());
    }

    @Transactional
    public void smsListInsertReSend(SmsInsertCommand smsInsertCommand, UserInfo userInfo){
        smsInsertCommand.setSmsUuid(UUID.randomUUID().toString());
        smsInsertCommand.setRgtrId(userInfo.getUser().getUserId());
        ProcErrorHandler.errorHandler(SmsInsertProc.procedureQuery(entityManager,userInfo,smsInsertCommand));
    }
}
