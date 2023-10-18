package com.cp.praha.work.area.service;

import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.work.area.entity.*;
import com.cp.praha.work.area.service.request.AreaDeleteCommand;
import com.cp.praha.work.area.service.request.AreaInsertCommand;
import com.cp.praha.work.area.service.request.AreaSelectPageCommand;
import com.cp.praha.work.area.service.request.AreaUpdateCommand;
import com.cp.praha.work.area.service.response.AreaSelectItemDomain;
import com.cp.praha.work.area.service.response.AreaSelectPageDomain;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor

public class AreaService {
    private final EntityManager entityManager;
    private final UserInfo userInfo;

    public List<AreaSelectPageDomain> areaSelectPage(AreaSelectPageCommand command){
        var procedure = AreaSelPageProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    public AreaSelectItemDomain areaSelectItem(@PathVariable String uuid){
        var procedure = AreaSelItemProc.procedureQuery(entityManager,uuid);
        ProcErrorHandler.errorHandler(procedure);

        return  GenericListType.getObjectType(new TypeReference<>() {}, procedure.getSingleResult());
    }

    @Transactional
    public void areaInsert(AreaInsertCommand command){
        String uuid= UUID.randomUUID().toString();
        command.setRgtrId(userInfo.getUser().getUserId());
        var procedure = AreaInsertProc.procedureQuery(entityManager,command,uuid);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    public void areaUpdate(AreaUpdateCommand command){
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = AreaUpdateProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }


    @Transactional
    public void areaDelete(AreaDeleteCommand command){
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = AreaDeleteProc.procedureQuery(entityManager,command);
        ProcErrorHandler.errorHandler(procedure);
    }

}
