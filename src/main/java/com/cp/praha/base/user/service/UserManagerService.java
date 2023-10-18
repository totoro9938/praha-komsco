package com.cp.praha.base.user.service;

import com.cp.praha.base.group.entity.GroupSelectProc;
import com.cp.praha.base.group.service.response.GroupSelDomain;
import com.cp.praha.base.user.entity.*;
import com.cp.praha.base.user.service.request.*;
import com.cp.praha.base.user.service.response.UserSelectItemDomain;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.GenericListType;
import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.config.CacheConstants;
import com.fasterxml.jackson.core.type.TypeReference;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserManagerService {

    private final EntityManager entityManager;
    private final UserInfo userInfo;

    @Value("${company.name}")
    private String companyCd;

    public GridDomain userSelectPage(UserSelectPageCommand userSelectPageCommand) {
        var procedure = UserSelectPageProc.procedureQuery(entityManager,userSelectPageCommand);
        var totalCount = (int) procedure.getOutputParameterValue("V_TOTALCOUNT");
        var curPage = (int) procedure.getOutputParameterValue("V_CUR_PAGE");
        ProcErrorHandler.errorHandler(procedure);

            GridDomain gridDomain = new GridDomain();
            gridDomain.setTotalCount(totalCount);
            gridDomain.setCurPage(curPage);
            gridDomain.setRows(GenericListType.getObjectType(new TypeReference<>() {},procedure.getResultList()));

            return gridDomain;

    }



    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_user", allEntries = true)
    public void userInsert(String ip, UserInsertCommand userInsertCommand) {

        userInsertCommand.setIp(ip);
        userInsertCommand.setUserUuid(UUID.randomUUID().toString());
        userInsertCommand.setUserId(userInfo.getUser().getUserId());
        var procedure = UserInsertProc.procedureQuery(entityManager,userInsertCommand);
        ProcErrorHandler.errorHandler(procedure);

    }



    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_user", allEntries = true)
    public void userUpdate(String ip, UserUptCommand userUptCommand) {
        userUptCommand.setIp(ip);
        userUptCommand.setMdfrId(userInfo.getUser().getUserId());
        var procedure = UserUpdateProc.procedureQuery(entityManager,userUptCommand);
        ProcErrorHandler.errorHandler(procedure);
    }



    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_user", allEntries = true)
    public void userUpdateIndex(UserUpdateIndexCommand userUpdateIndexCommand) {
        userUpdateIndexCommand.setMdfrId(userInfo.getUser().getUserId());
        var procedure = UserUpdateIndexProc.procedureQuery(entityManager,userUpdateIndexCommand);
        ProcErrorHandler.errorHandler(procedure);
    }



    public UserSelectItemDomain userSelectItem(String userUuid) {
        var procedure = UserSelectItemProc.procedureQuery(entityManager,userUuid);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {},procedure.getSingleResult()) ;
    }



    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_user", allEntries = true)
    public void userDelete(String ip, UserDeleteCommand userDeleteCommand) {

        userDeleteCommand.setIp(ip);
        userDeleteCommand.setMdfrId(userInfo.getUser().getUserId());
        var procedure = UserDeleteProc.procedureQuery(entityManager,userDeleteCommand);
        ProcErrorHandler.errorHandler(procedure);
    }



    @Transactional
    public void userPasswordReset(String ip, UserPasswordResetCommand userPasswordResetCommand) {

        userPasswordResetCommand.setIp(ip);
        userPasswordResetCommand.setRgtrId(userInfo.getUser().getUserId());
        var procedure = UserPasswordResetProc.procedureQuery(entityManager,userPasswordResetCommand);
        ProcErrorHandler.errorHandler(procedure);
    }



    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_user", allEntries = true)
    public void userUpload(String ip, List<UserUploadCommand> userUploadCommandList) {
        int index = 1;
        for (UserUploadCommand command : userUploadCommandList) {
            command.setRgtrId(userInfo.getUser().getUserId());
            command.setUserUuid(UUID.randomUUID().toString());
            command.setSaveCnt(userUploadCommandList.size());
            command.setUploadIdx(index);
            command.setUserIdx(0);
            command.setIp(ip);
            index++;
            var procedure = UserUploadProc.procedureQuery(entityManager,command);
            ProcErrorHandler.errorHandler(procedure);
        }
    }



    public List<GroupSelDomain> groupSelect() {
        var procedure = GroupSelectProc.procedureQuery(entityManager);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }


}
