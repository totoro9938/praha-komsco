package com.cp.praha.main.home.service;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.main.home.entity.ProgramAuthSelUserProc;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class HomeService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public List<ProgramAuthSelUserProc> getProgramAuthSelUser(){
        var user = userInfo.getUser();
        var procedure = ProgramAuthSelUserProc.procedureQuery(entityManager, user.getUserId());
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {
        },procedure.getResultList());
    }

}
