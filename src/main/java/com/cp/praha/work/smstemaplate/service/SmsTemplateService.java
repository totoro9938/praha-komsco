package com.cp.praha.work.smstemaplate.service;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.consultmain.service.response.SmsTemplateSelectDomain;
import com.cp.praha.work.smstemaplate.entity.SmsTemplateInsertProc;
import com.cp.praha.work.smstemaplate.entity.SmsTemplateSelectItemProc;
import com.cp.praha.work.smstemaplate.entity.SmsTemplateSelectPageProc;
import com.cp.praha.work.smstemaplate.entity.SmsTemplateUpdateProc;
import com.cp.praha.work.smstemaplate.service.request.SmsTemplateInsertCommand;
import com.cp.praha.work.smstemaplate.service.request.SmsTemplateSelectPageCommand;
import com.cp.praha.work.smstemaplate.service.request.SmsTemplateUpdateCommand;
import com.cp.praha.work.smstemaplate.service.response.SmsTemplateSelectPageDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class SmsTemplateService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;
    private final UserInfo userInfo;

    public List<SmsTemplateSelectPageDomain> smsTemplateSelectPage(SmsTemplateSelectPageCommand command) {
        var procedure = SmsTemplateSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){}, procedure.getResultList());
    }

    public SmsTemplateSelectDomain smsTemplateSelectItem(String smsTemplateUuid) {
        var procedure = SmsTemplateSelectItemProc.procedureQuery(entityManager,smsTemplateUuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){},procedure.getSingleResult());
    }

    @Transactional
    public void smsTemplateInsert(SmsTemplateInsertCommand command) {
        command.setRgtrId(userInfo.getUser().getUserId());
        var procedure = SmsTemplateInsertProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void smsTemplateUpdate(SmsTemplateUpdateCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = SmsTemplateUpdateProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void templateUpdate(List<SmsTemplateUpdateCommand> command) {
        for(SmsTemplateUpdateCommand list : command){
            list.setMdfrId(userInfo.getUser().getUserId());
            var procedure = SmsTemplateUpdateProc.procedureQuery(entityManager,list);
            ProcErrorHandler.errorHandler(procedure);
        }
    }
}
