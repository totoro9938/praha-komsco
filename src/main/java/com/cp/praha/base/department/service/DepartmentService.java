package com.cp.praha.base.department.service;

import com.cp.praha.base.department.entity.*;
import com.cp.praha.base.department.service.request.DepartmentInsertCommand;
import com.cp.praha.base.department.service.request.DepartmentMoveCommand;
import com.cp.praha.base.department.service.request.DepartmentSelectCommand;
import com.cp.praha.base.department.service.request.DepartmentUpdateCommand;
import com.cp.praha.base.department.service.response.DepartmentSelectDomain;
import com.cp.praha.base.department.service.response.DepartmentTreeSelectDomain;
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

public class DepartmentService {

    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;

    private final UserInfo userInfo;
    /**
     * USP_DEPT_SEL_ALL 전체 조직정보 조회
     * @return List<DepartmentSelectAllProc>
     */
    public List<DepartmentSelectAllProc> getDeptSelAll() {
        var procedure = DepartmentSelectAllProc.procedureQuery(entityManager);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    /**
     * USP_DEPT_TREE_SEL 트리드롭다운 조직정보
     * @return List<DepartmentTreeSelectDomain>
     */
    public List<DepartmentTreeSelectDomain> getDeptTreeSel(){
        var procedure = DepartmentTreeSelectProc.procedureQuery(entityManager);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }


    public DeptSelItemProc deptSelItem(String deptUuid){
        var procedure = DeptSelItemProc.procedureQuery(entityManager,deptUuid);
        ProcErrorHandler.errorHandler(procedure);

        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getSingleResult());
    }



    /**
     * USP_DEPT_SEL 조직정보 그리드 리스트
     * @return List<DepartmentSelectDomain>
     */
    public List<DepartmentSelectDomain> deptSelect(DepartmentSelectCommand command){
        var procedure = DepartmentSelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    /**
     * USP_DEPT_INS 조직정보 저장
     */
    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_dept", allEntries = true)
    public void deptInsert(List<DepartmentInsertCommand> command ) {
        for (DepartmentInsertCommand deptInsInst : command){
            deptInsInst.setRgtrId(userInfo.getUser().getUserId());
            String uuid = UUID.randomUUID().toString();
            deptInsInst.setDeptUuid(uuid);
            var procedure = DepartmentInsertProc.procedureQuery(entityManager,deptInsInst);
            ProcErrorHandler.errorHandler(procedure);
        }
    }


    /**
     * USP_DEPT_UPT 조직정보 업데이트
     */
    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_dept", allEntries = true)
    public void deptUpdate(List<DepartmentUpdateCommand> command ) {
        for(DepartmentUpdateCommand deptUptList: command){
            deptUptList.setMdfrId(userInfo.getUser().getUserId());
            var procedure = DepartmentUpdateProc.procedureQuery(entityManager, deptUptList);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    /**
     *USP_DEPT_MOV 조직정보 이동
     */
    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_dept", allEntries = true)
    public void deptMove(DepartmentMoveCommand command) {
        command.setMoveType(0);
        var procedure = DepartmentMoveProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_dept", allEntries = true)
    public void deptItemUpdate(DepartmentUpdateCommand command) {
        command.setMdfrId(userInfo.getUser().getUserId());
        var procedure = DepartmentUpdateProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
    }

    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_dept", allEntries = true)
    public void deptCacheReset(){}

    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_user", allEntries = true)
    public void userCacheReset(){}
}