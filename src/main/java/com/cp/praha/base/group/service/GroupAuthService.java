package com.cp.praha.base.group.service;


import com.cp.praha.base.group.entity.*;
import com.cp.praha.base.group.service.request.*;
import com.cp.praha.base.group.service.response.GroupSelAllDomain;
import com.cp.praha.base.group.service.response.GroupSelDomain;
import com.cp.praha.base.group.service.response.GroupSelItemDomain;
import com.cp.praha.base.group.service.response.ProgramAuthSelDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class GroupAuthService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    @Value("${company.name}")
    private String companyCd;

    public List<GroupSelAllDomain> groupSelectAll() {
        var procedure = GroupSelectAllProc.procedureQuery(entityManager);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }



    public List<GroupSelDomain> groupSelect(GroupSelectCommand groupSelCommand) {
        groupSelCommand.setGroupUid(userInfo.getUser().getGroupUid());
        var procedure = GroupSelectProc.procedureQuery(entityManager,groupSelCommand);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }



    public GroupSelItemDomain groupSelectItem(String uuid) {
        var procedure = GroupSelItemProc.procedureQuery(entityManager,uuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getSingleResult());
    }



    public List<ProgramAuthSelDomain> programAuthSelect(ProgramAuthSelectCommand programAuthSelCommand) {
        programAuthSelCommand.setUserId(userInfo.getUser().getUserId());
        programAuthSelCommand.setAuthGroupUid(userInfo.getUser().getGroupUid());

        List<ProgramAuthSelDomain> webAppData = new ArrayList<ProgramAuthSelDomain>();


        var procedure = ProgramAuthSelProc.procedureQuery(entityManager,programAuthSelCommand);
        ProcErrorHandler.errorHandler(procedure);
        webAppData.addAll((List<ProgramAuthSelDomain>) procedure.getResultList());
        if(programAuthSelCommand.getProgramId() == 1){
            webAppData.addAll(programAuthSelectWebApp(programAuthSelCommand));
        }
        return webAppData;

    }

    public List<ProgramAuthSelDomain> programAuthSelectWebApp(ProgramAuthSelectCommand command) {
        command.setProgramId(2);
        var procedure = ProgramAuthSelProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }



    @Transactional
    public void programAuthSave(String ip, List<ProgramAuthSaveCommand> programAuthSaveCommandlist) {

        for (ProgramAuthSaveCommand programAuthSaveCommand : programAuthSaveCommandlist) {
            programAuthSaveCommand.setAuthGroupUid(userInfo.getUser().getGroupUid());
            programAuthSaveCommand.setUserId(userInfo.getUser().getUserId());
            programAuthSaveCommand.setIp(ip);
            var procedure = ProgramAuthSaveProc.procedureQuery(entityManager,programAuthSaveCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }



    @Transactional
    public void groupUpdate(String ip, List<GroupUpdateCommand> groupUptCommandList) {

        for (GroupUpdateCommand groupUptCommand : groupUptCommandList) {
            groupUptCommand.setIp(ip);
            groupUptCommand.setUserId(userInfo.getUser().getUserId());
            var procedure = GroupUpdateProc.procedureQuery(entityManager,groupUptCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }



    @Transactional
    public void groupInsert(String ip, List<GroupInsertCommand> groupInsCommandList) {

        for (GroupInsertCommand groupInsCommand : groupInsCommandList) {
            groupInsCommand.setIp(ip);
            groupInsCommand.setGroupUuid(UUID.randomUUID().toString());
            groupInsCommand.setUserId(userInfo.getUser().getUserId());
            var procedure = GroupInsertProc.procedureQuery(entityManager,groupInsCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }


    @Transactional
    public void groupDelete(String ip, GroupDeleteCommand groupDeleteCommand) {
        groupDeleteCommand.setUserId(userInfo.getUser().getUserId());
        var procedure = GroupDeleteProc.procedureQuery(entityManager,groupDeleteCommand, ip);
        ProcErrorHandler.errorHandler(procedure);
    }



}
