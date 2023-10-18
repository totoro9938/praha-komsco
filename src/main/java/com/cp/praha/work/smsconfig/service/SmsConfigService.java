package com.cp.praha.work.smsconfig.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.smsconsult.entity.SmsSpamTelNoUpdateProc;
import com.cp.praha.work.smsconfig.entity.SmsSpamTelNoSelectItemProc;
import com.cp.praha.work.smsconfig.entity.SmsSpamTelNoSelectPageProc;
import com.cp.praha.work.smsconfig.entity.UserAppointSaveProc;
import com.cp.praha.work.smsconfig.entity.UserAppointSelectProc;
import com.cp.praha.work.smsconfig.service.request.SmsSpamTelNoSelectPageCommand;
import com.cp.praha.work.smsconfig.service.request.UserAppointSaveCommand;
import com.cp.praha.work.smsconfig.service.response.SmsSpamTelNoSelectItemDomain;
import com.cp.praha.work.smsconfig.service.response.UserAppointSelectDomain;
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
public class SmsConfigService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;
    private final UserInfo userInfo;


    public List<UserAppointSelectDomain> smscallUserSelect(int deptId) {
        var procedure = UserAppointSelectProc.procedureQuery(entityManager,deptId);
        return GenericListType.getObjectType(new TypeReference<>(){}, procedure.getResultList());
    }

    @Transactional
    public void smscallUserSet(List<UserAppointSaveCommand> command) {
        for(UserAppointSaveCommand list : command){
            list.setRgtrId(userInfo.getUser().getUserId());
            var procedure = UserAppointSaveProc.procedureQuery(entityManager,list);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    public GridDomain smsSpamSelectPage(SmsSpamTelNoSelectPageCommand command) {
        var procedure = SmsSpamTelNoSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        var totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        var curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount(totalCount);
        gridDomain.setCurPage(curPage);
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList()));
        return gridDomain;
    }

    public SmsSpamTelNoSelectItemDomain smsSpamSelectItem(String uuid) {
        var procedure = SmsSpamTelNoSelectItemProc.procedureQuery(entityManager,uuid);
        return GenericListType.getObjectType(new TypeReference<>(){}, procedure.getSingleResult());
    }

    @Transactional
    public void smsSpamRelease(String uuid) {
        var procedure = SmsSpamTelNoUpdateProc.procedureQuery(entityManager,userInfo,uuid);
        ProcErrorHandler.errorHandler(procedure);
    }

}
