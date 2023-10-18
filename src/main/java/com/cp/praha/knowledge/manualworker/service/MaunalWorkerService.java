package com.cp.praha.knowledge.manualworker.service;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.knowledge.manualworker.entity.ManualWorkerDeleteProc;
import com.cp.praha.knowledge.manualworker.entity.ManualWorkerInsertProc;
import com.cp.praha.knowledge.manualworker.entity.ManualWorkerSelectProc;
import com.cp.praha.knowledge.manualworker.entity.ManualWorkerUpdateProc;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerDeleteCommand;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerInsertCommand;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerSelectCommand;
import com.cp.praha.knowledge.manualworker.service.request.ManualWorkerUpdateCommand;
import com.cp.praha.knowledge.manualworker.service.response.ManualWorkerSelectDomain;
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
public class MaunalWorkerService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public List<ManualWorkerSelectDomain> manualWorkerSelect(ManualWorkerSelectCommand command) {
        var procedure = ManualWorkerSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        }, procedure.getResultList());
    }

    @Transactional
    public void manualWorkerUpdate(List<ManualWorkerUpdateCommand> commands) {
        for(ManualWorkerUpdateCommand command : commands) {
            var procedure = ManualWorkerUpdateProc.procedureQuery(entityManager, command);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    public void manualWorkerDelete(List<ManualWorkerDeleteCommand> commands) {
        for(ManualWorkerDeleteCommand command : commands) {
            var procedure = ManualWorkerDeleteProc.procedureQuery(entityManager, command);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    @Transactional
    public void manualWorkerInsert(List<ManualWorkerInsertCommand> commands) {
        for(ManualWorkerInsertCommand command : commands) {
            var procedure = ManualWorkerInsertProc.procedureQuery(entityManager, userInfo.getUser().getUserId(), command);
            ProcErrorHandler.errorHandler(procedure);
        }
    }
}
