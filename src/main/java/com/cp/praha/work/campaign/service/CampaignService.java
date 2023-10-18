package com.cp.praha.work.campaign.service;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.consult.smslist.entity.SmsInsertProc;
import com.cp.praha.consult.smslist.service.request.SmsInsertCommand;
import com.cp.praha.work.campaign.entity.*;
import com.cp.praha.work.campaign.service.request.*;
import com.cp.praha.work.campaign.service.response.CampaignInsertDomain;
import com.cp.praha.work.campaign.service.response.CampaignSelectItemDomain;
import com.cp.praha.work.campaign.service.response.CampaignSmsResultSelectDomain;
import com.cp.praha.work.campaign.service.response.CampaignUserDistribSelectDomain;
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
public class CampaignService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;
    private final UserInfo userInfo;

    public GridDomain campaignSelectPage(CampaignSelectPageCommand campaignSelectPageCommand){
        var procedure = CampaignSelectPageProc.procedureQuery(entityManager, campaignSelectPageCommand);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain campaignGridDomain = new GridDomain();
        campaignGridDomain.setCurPage((int)procedure.getOutputParameterValue("V_CUR_PAGE"));
        campaignGridDomain.setTotalCount((int)procedure.getOutputParameterValue("V_TOTALCOUNT"));
        campaignGridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {
        }, procedure.getResultList()));
        return campaignGridDomain;
    }

    public CampaignSelectItemDomain campaignSelectItem(String uuid){
        var procedure = CampaignSelectItemProc.procedureQuery(entityManager, uuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){}, procedure.getSingleResult());

    }

    public GridDomain campaignTargetSelectPage(CampaignTargetSelectPageCommand CampaignTargetSelectPageCommand){
        var procedure = CampaignTargetSelectPageProc.procedureQuery(entityManager, CampaignTargetSelectPageCommand);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain campaignGridDomain = new GridDomain();
        campaignGridDomain.setCurPage((int)procedure.getOutputParameterValue("V_CUR_PAGE"));
        campaignGridDomain.setTotalCount((int)procedure.getOutputParameterValue("V_TOTALCOUNT"));
        campaignGridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {
        }, procedure.getResultList()));
        return campaignGridDomain;
    }

    public GridDomain campaignCustSelectPage(CampaignCustSelectPageCommand command){
        command.setParentId(0);
        command.setDeptId(0);
        var procedure = CampaignCustSelectPageProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        GridDomain campaignGridDomain = new GridDomain();
        campaignGridDomain.setCurPage((int)procedure.getOutputParameterValue("V_CUR_PAGE"));
        campaignGridDomain.setTotalCount((int)procedure.getOutputParameterValue("V_TOTALCOUNT"));
        campaignGridDomain.setRows(GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList()));
        return campaignGridDomain;
    }

    public List<CampaignUserDistribSelectDomain> campaignUserDistribSelect(int campaignId){
        var procedure = CampaignUserDistribSelectProc.procedureQuery(entityManager, campaignId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList());
    }

    @Transactional
    public CampaignInsertDomain campaignInsert(CampaignInsertCommand campaignInsertCommand, UserInfo userInfo){
        campaignInsertCommand.setCampaignUuid(UUID.randomUUID().toString());
        campaignInsertCommand.setRgtrId(userInfo.getUser().getUserId());
        var procedure = CampaignInsertProc.procedureQuery(entityManager, campaignInsertCommand);
        ProcErrorHandler.errorHandler(procedure);
        CampaignInsertDomain domain = new CampaignInsertDomain();
        domain.setCampaignId((int)procedure.getOutputParameterValue("V_CAMPAIGN_ID"));
        domain.setRegistStep((String) procedure.getOutputParameterValue("V_REGIST_STEP"));
        return domain;
    }


    @Transactional
    public void campaignUpdate(CampaignUpdateCommand campaignUpdateCommand, UserInfo userInfo){
        campaignUpdateCommand.setMdfrId(userInfo.getUser().getUserId());
        var procedure = CampaignUpdateProc.procedureQuery(entityManager, campaignUpdateCommand);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public String campaignRegistStepUpdate(CampaignRegistStepUpdateCommand command){
        var procedure = CampaignRegistStepUpdateProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return (String) procedure.getOutputParameterValue("O_REGIST_STEP");
    }

    @Transactional
    public void campaignCustInsert(List<CampaignCustInsertCommand> commands, UserInfo userInfo){
        for(CampaignCustInsertCommand command : commands ){
            command.setRgtrId(userInfo.getUser().getUserId());
            var procedure = CampaignCustInsertProc.procedureQuery(entityManager, command);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    public void campaignCustDelete(List<CampaignCustDeleteCommand> commands, UserInfo userInfo){
        for(CampaignCustDeleteCommand command : commands ){
            command.setMdfrId(userInfo.getUser().getUserId());
            var procedure = CampaignCustDeleteProc.procedureQuery(entityManager, command);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    public void campaignCustDisInsert(CampaignCustDisInsertCommand command, UserInfo userInfo){
        command.setRgtrId(userInfo.getUser().getUserId());
        var procedure = CampaignCustUpdateDisInsertProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void campaignCustDisCollect(CampaignCustDisCollectCommand command, UserInfo userInfo){
        command.setRgtrId(userInfo.getUser().getUserId());
        var procedure = CampaignCustUpdateDisClsProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void campaignCustUpload(List<CampaignCustUploadCommand> commands, String ip, UserInfo userInfo){
        for(CampaignCustUploadCommand command : commands ){
            command.setIp(ip);
            command.setRgtrId(userInfo.getUser().getUserId());
            var procedure = CampaignCustUploadProc.procedureQuery(entityManager, command);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    /**
     * 캠페인 문자발송
     * smsGroupId 첫 문자발송 대상자 => 0,  이후부터는 outParameter로 groudId를 받아 2번째 대상자들부터는 그 id로 setting
     */
    @Transactional
    public void campaignSmsInsert(List<SmsInsertCommand> commands) {
        for(SmsInsertCommand command : commands ){
            command.setSmsGroupId(0);
            command.setSmsId(0);
            var procedure = SmsInsertProc.procedureQuery(entityManager, userInfo, command);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    public List<CampaignSmsResultSelectDomain> campaignSmsResultSelect(int campaignId){
        var procedure = CampaignSmsResultSelectProc.procedureQuery(entityManager,  campaignId);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>(){},procedure.getResultList());
    }


}
