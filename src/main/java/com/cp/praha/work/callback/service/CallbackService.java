package com.cp.praha.work.callback.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.work.callback.entity.CallbackDistributionClearProc;
import com.cp.praha.work.callback.entity.CallbackDistributionProc;
import com.cp.praha.work.callback.entity.CallbackSelectPageProc;
import com.cp.praha.work.callback.entity.CallbackUserDistribSelectProc;
import com.cp.praha.work.callback.service.request.CallbackDistributionClearCommand;
import com.cp.praha.work.callback.service.request.CallbackDistributionCommand;
import com.cp.praha.work.callback.service.request.CallbackSelectPageCommand;
import com.cp.praha.work.callback.service.request.CallbackUserDstribSelectCommand;
import com.cp.praha.work.callback.service.response.CallbackUserDstribSelectDomain;
import com.cp.praha.work.smsconfig.entity.UserAppointSelectProc;
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
public class CallbackService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;
    private final UserInfo userInfo;

    public GridDomain callbackSelectPage(CallbackSelectPageCommand command) {
        var procedure = CallbackSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        var totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        var curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");
        GridDomain gridDomain = new GridDomain();
        gridDomain.setTotalCount(totalCount);
        gridDomain.setCurPage(curPage);
        gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>(){
        },procedure.getResultList()));
        return gridDomain;
    }

    public List<CallbackUserDstribSelectDomain> callbackUserDstribSelect(CallbackUserDstribSelectCommand command){
        var procedure = CallbackUserDistribSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }

    @Transactional
    public void callbackDistribution(CallbackDistributionCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = CallbackDistributionProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void callbackDistributionClear(CallbackDistributionClearCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = CallbackDistributionClearProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public List<UserAppointSelectDomain> callbackUserSelect(int deptId){
        var procedure = UserAppointSelectProc.procedureQuery(entityManager, deptId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }

}
