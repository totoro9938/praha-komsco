package com.cp.praha.base.logInfo.service;

import com.cp.praha.base.logInfo.entity.*;
import com.cp.praha.base.logInfo.service.request.*;
import com.cp.praha.base.logbatch.entity.LogBatchSelectPageProc;
import com.cp.praha.base.logbatch.service.request.LogBatchSelectPageCommand;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class LogInformationService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;

    public GridDomain getLoginSelect(LogInfoLoginSelectCommand logInfoLoginSelectCommand, UserInfo userInfo){
        logInfoLoginSelectCommand.setUserId(userInfo.getUser().getUserId());
        logInfoLoginSelectCommand.setUserCd(userInfo.getUser().getUserCd());
        var procedure = LogInfoLoginSelectProc.procedureQuery(entityManager,logInfoLoginSelectCommand);
        ProcErrorHandler.errorHandler(procedure);
        return extendGridDomain((int)procedure.getOutputParameterValue("V_CUR_PAGE"),
                (int)procedure.getOutputParameterValue("V_TOTALCOUNT"),
                GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList()));
    }

    public GridDomain getAclSelect(LogInfoAclSelectPageCommand command, UserInfo userInfo){
        command.setUserId(userInfo.getUser().getUserId());
        command.setUserCd(userInfo.getUser().getUserCd());
        var procedure = LogInfoAclSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return  extendGridDomain((int)procedure.getOutputParameterValue("V_CUR_PAGE"),
                (int)procedure.getOutputParameterValue("V_TOTALCOUNT"),
                GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList()));
    }



    public GridDomain getUserSelect(LogInfoUserSelectCommand logInfoUserSelectCommand, UserInfo userInfo){
        logInfoUserSelectCommand.setUserId(userInfo.getUser().getUserId());
        logInfoUserSelectCommand.setUserCd(userInfo.getUser().getUserCd());
        var procedure = LogInfoUserSelectProc.procedureQuery(entityManager,logInfoUserSelectCommand);
        ProcErrorHandler.errorHandler(procedure);
        return  extendGridDomain((int)procedure.getOutputParameterValue("V_CUR_PAGE"),
                (int)procedure.getOutputParameterValue("V_TOTALCOUNT"),
                GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList()));
    }

    public GridDomain getGroupSelect(LogInfoGroupSelectCommand logInfoGroupSelectCommand, UserInfo userInfo){
        logInfoGroupSelectCommand.setRgtrId(userInfo.getUser().getUserId());
        logInfoGroupSelectCommand.setUserCd(userInfo.getUser().getUserCd());
        var procedure = LogInfoGroupSelectProc.procedureQuery(entityManager,logInfoGroupSelectCommand);
        ProcErrorHandler.errorHandler(procedure);
        return extendGridDomain((int)procedure.getOutputParameterValue("V_CUR_PAGE"),
                (int)procedure.getOutputParameterValue("V_TOTALCOUNT"),
                GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList()));
    }

    public GridDomain getExcelSelect(LogInfoExcelDownSelectCommand logInfoExcelDownSelectCommand, UserInfo userInfo){
        logInfoExcelDownSelectCommand.setUserId(userInfo.getUser().getUserId());
        logInfoExcelDownSelectCommand.setUserCd(userInfo.getUser().getUserCd());
        var procedure = LogInfoExcelDownSelectProc.procedureQuery(entityManager,logInfoExcelDownSelectCommand);
        ProcErrorHandler.errorHandler(procedure);
        return  extendGridDomain((int)procedure.getOutputParameterValue("V_CUR_PAGE"),
                (int)procedure.getOutputParameterValue("V_TOTALCOUNT"),
                GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
    }



    public GridDomain getPrivateSelect(LogInfoPrivateSelectCommand logInfoPrivateSelectCommand, UserInfo userInfo){
        logInfoPrivateSelectCommand.setUserId(userInfo.getUser().getUserId());
        logInfoPrivateSelectCommand.setUserCd(userInfo.getUser().getUserCd());
        var procedure = LogInfoPrivateSelectProc.procedureQuery(entityManager,logInfoPrivateSelectCommand);
        ProcErrorHandler.errorHandler(procedure);
        return  extendGridDomain((int)procedure.getOutputParameterValue("V_CUR_PAGE"),
                (int)procedure.getOutputParameterValue("V_TOTALCOUNT"),
                GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
    }

    public GridDomain getDeleteSelect(LogBatchSelectPageCommand command) {
        var procedure = LogBatchSelectPageProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return extendGridDomain((int)procedure.getOutputParameterValue("V_CUR_PAGE"),
                (int)procedure.getOutputParameterValue("V_TOTALCOUNT"),
                GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
    }

    public GridDomain extendGridDomain(int curPage, int totalCount, List<?> selectDomain){
        GridDomain logGridDomain = new GridDomain();
        logGridDomain.setCurPage(curPage);
        logGridDomain.setTotalCount(totalCount);
        logGridDomain.setRows(selectDomain);

        return logGridDomain;
    }

}
