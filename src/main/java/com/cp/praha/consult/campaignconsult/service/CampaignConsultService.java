package com.cp.praha.consult.campaignconsult.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.campaignconsult.entity.*;
import com.cp.praha.consult.campaignconsult.service.request.*;
import com.cp.praha.consult.campaignconsult.service.response.CampaignConsultCustSelectItemDomain;
import com.cp.praha.consult.campaignconsult.service.response.CampaignConsultSumSelectDomain;
import com.cp.praha.consult.campaignconsult.service.response.CampaignConsultVisitorSelectDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CampaignConsultService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public GridDomain campaignConsultSumSelectPage(CampaignConsultSumSelectPageCommand command){
        var procedure = CampaignConsultSumSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain campaignGridDomain = new GridDomain();
        campaignGridDomain.setCurPage((int)procedure.getOutputParameterValue("V_CUR_PAGE"));
        campaignGridDomain.setTotalCount((int)procedure.getOutputParameterValue("V_TOTALCOUNT"));
        campaignGridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
        return campaignGridDomain;
    }

    public CampaignConsultSumSelectDomain campaignConsultSumSelect(CampaignConsultSumSelectCommand command){
        var procedure = CampaignConsultSumSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getSingleResult());
    }

    public GridDomain campaignConsultCustCallSelectPage(CampaignConsultCustCallSelectPageCommand command){
        var procedure = CampaignConsultCustCallSelectPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain campaignGridDomain = new GridDomain();
        campaignGridDomain.setCurPage((int)procedure.getOutputParameterValue("V_CUR_PAGE"));
        campaignGridDomain.setTotalCount((int)procedure.getOutputParameterValue("V_TOTALCOUNT"));
        campaignGridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));
        return campaignGridDomain;
    }

    public CampaignConsultCustSelectItemDomain campaignConsultCustSelectItem(CampaignConsultCustSelectItemCommand command){
        var procedure = CampaignConsultCustSelectItemProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getSingleResult());
    }

    public List<CampaignConsultVisitorSelectDomain> campaignConsultVisitorSelect(CampaignConsultVisitorSelectCommand command){
        var procedure = CampaignConsultVisitorSelectProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList());
    }

    @Transactional
    public void campaignConsultVisitorInsert(CampaignConsultVisitorInsertCommand command,String ip){
        var procedure = CampaignConsultVisitorInsertProc.procedureQuery(entityManager,userInfo,command,ip);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void campaignConsultCustUpdate(CampaignConsultCustUpdateCommand command){
        var procedure = CampaignConsultCustUpdateProc.procedureQuery(entityManager,userInfo,command);
        ProcErrorHandler.errorHandler(procedure);
    }
}
