package com.cp.praha.base.category.service;

import com.cp.praha.base.category.entity.*;
import com.cp.praha.base.category.service.request.*;
import com.cp.praha.base.category.service.response.CategoryMoveTreeSelectDomain;
import com.cp.praha.base.category.service.response.CategorySelectDomain;
import com.cp.praha.base.category.service.response.CategoryTreeDomain;
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

@SuppressWarnings("ALL")
@Service
@Slf4j
@RequiredArgsConstructor

public class CategoryService {
    private final EntityManager entityManager;

    @Value("${company.name}")
    private String companyName;

    private final UserInfo userInfo;

    /**
     * USP_CAT_SEL  카테고리 그리드 데이터 조회
     *
     * @return
     */

    public List<CategorySelectDomain> categorySelect(CategorySelectCommand command) {
        var procedure = CategorySelectProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }

    /**
     * USP_CAT_SEL 카테고리 드롭다운트리
     *
     * @return
     */

    public List<CategoryTreeDomain> categoryTreeSelect(CategoryTreeCommand command) {
        var procedure = CategoryTreeProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }


    /**
     * USP_CAT_INS 카테고리 데이터 등록
     *
     * @return
     */
    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_callCat", allEntries = true)
    public void categoryInsert(List<CategoryInsertCommand> command) {
        for (CategoryInsertCommand catInsCommand : command) {
            catInsCommand.setRgtrId(userInfo.getUser().getUserId());
            var procedure = CategoryInsertProc.procedureQuery(entityManager, catInsCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    /**
     * USP_CAT_INS 카테고리 데이터 수정
     *
     * @return
     */
    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_callCat", allEntries = true)
    public void categoryUpdate(List<CategoryUpdateCommand> command) {
        for (CategoryUpdateCommand catUptCommand : command) {
            catUptCommand.setMdfrId(userInfo.getUser().getUserId());
            var procedure = CategoryUpdateProc.procedureQuery(entityManager, catUptCommand);
            ProcErrorHandler.errorHandler(procedure);
        }
    }

    /**
     * USP_CAT_MOV_TREE_SEL 카테고리 데이터 수정
     *
     * @return
     */
    public List<CategoryMoveTreeSelectDomain> moveTreeSelect(String catGroupCd) {
        var procedure = CategoryMoveTreeSelectProc.procedureQuery(entityManager, catGroupCd);
        ProcErrorHandler.errorHandler(procedure);
        return GenericListType.getObjectType(new TypeReference<>() {}, procedure.getResultList());
    }


    /**
     * USP_CAT_MOV 카테고리 데이터 이동
     *
     * @return
     */
    @Transactional
    @CacheEvict(value = CacheConstants.CACHE_PREFIX +"_callCat", allEntries = true)
    public void categoryMove(CategoryMoveCommand command) {
        var procedure = CategoryMoveProc.procedureQuery(entityManager, command);
        ProcErrorHandler.errorHandler(procedure);
    }


}
