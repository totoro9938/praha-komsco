package com.cp.praha.base.program.service;

import com.cp.praha.base.program.entity.*;
import com.cp.praha.base.program.service.request.*;
import com.cp.praha.base.program.service.response.ProgramSelectDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
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
public class ProgramManagementService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;

    private final UserInfo userInfo;

    public List<ProgramSelectDomain> getProgramSelect(ProgramSelectCommand programSelCommand){
        var procedure = ProgramSelectProc.procedureQuery(entityManager,programSelCommand);
        ProcErrorHandler.errorHandler(procedure);
            return GenericListType.getObjectType(new TypeReference<>() {
            },procedure.getResultList());
    }


    public List<ProgramSelectProc> getProgramSelectItem(ProgramSelectItemCommand programSelItemCommand){
        var procedure = ProgramSelectItemProc.procedureQuery(entityManager,programSelItemCommand);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }

    @Transactional
    public void programUpdate(List<ProgramUpdateCommand> programUptCommands, UserInfo userInfo){
        int lastDataCheck = 0;
        for(ProgramUpdateCommand programUptCommand : programUptCommands ) {
            lastDataCheck += 1;
            if(programUptCommands.size() == lastDataCheck){
                programUptCommand.setReIdxYn("Y");
            }
            programUptCommand.setMdfrId(userInfo.getUser().getUserId());
            var procedure = ProgramUpdateProc.procedureQuery(entityManager,programUptCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    public void programInsert(List<ProgramInsertCommand> programInsCommands, UserInfo userInfo){
        for(ProgramInsertCommand programInsCommand : programInsCommands ){
            programInsCommand.setRgtrId(userInfo.getUser().getUserId());
            programInsCommand.setProgramUuid(UUID.randomUUID().toString());
            var procedure = ProgramInsertProc.procedureQuery(entityManager,programInsCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    /**
     * USP_PROGRAM_MOV 프로그램 데이터 이동
     * @return
     */
    @Transactional
    public void programMove(ProgramMoveCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = ProgramMoveProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }
}
