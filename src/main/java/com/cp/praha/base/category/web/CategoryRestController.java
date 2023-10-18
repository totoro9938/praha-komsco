package com.cp.praha.base.category.web;

import com.cp.praha.base.category.service.CategoryService;
import com.cp.praha.base.category.service.request.*;
import com.cp.praha.base.category.service.response.CategoryMoveTreeSelectDomain;
import com.cp.praha.base.category.service.response.CategorySelectDomain;
import com.cp.praha.base.category.service.response.CategoryTreeDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.validation.CustomCollectionValidator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/base/v1")
@Secured("ROLE_BASE_CAT_MGR_SELECT")
public class CategoryRestController {
    private final CustomCollectionValidator customCollectionValidator;
    private final CategoryService categoryService;
    private final UserInfo userInfo;

    /**
     * USP_CAT_SEL 카테고리 그리드 데이터 조회
     * @return
     */
    @GetMapping("/cat")
    public List<CategorySelectDomain> categorySelect(CategorySelectCommand command){
        return categoryService.categorySelect(command);
    }

    /**
     * USP_CAT_TREE 카테고리 드롭다운트리
     * @return
     */
    @GetMapping("/cat/treeSelect")
    public List<CategoryTreeDomain> categoryTreeSelect(CategoryTreeCommand command){
        return categoryService.categoryTreeSelect(command);
    }


    /**
     * USP_CAT_INS 카테고리 데이터 등록
     * @return
     */
    @PostMapping("/cat")
    @Secured("ROLE_BASE_CAT_MGR_INSERT")
    public ResponseEntity<HttpStatus> categoryInsert(@RequestBody @Valid List<CategoryInsertCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors()) categoryService.categoryInsert(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_CAT_INS 카테고리 데이터 수정
     * @return
     */
    @PutMapping("/cat")
    @Secured("ROLE_BASE_CAT_MGR_UPDATE")
    public ResponseEntity<HttpStatus> categoryUpdate(@RequestBody @Valid List<CategoryUpdateCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors()) categoryService.categoryUpdate(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_CAT_MOV_TREE_SEL 카테고리 데이터 수정
     * @return
     */
    @GetMapping("/cat/moveTreeSelect/{catGroupCd}")
    public List<CategoryMoveTreeSelectDomain> moveTreeSelect(@PathVariable("catGroupCd") String catGroupCd){
        return categoryService.moveTreeSelect(catGroupCd);
    }

    /**
     * USP_CAT_MOV 카테고리 데이터 이동
     * @return
     */
    @PutMapping("/cat/cat-move")
    @Secured("ROLE_BASE_CAT_MGR_EXTEND_01")
    public ResponseEntity<HttpStatus> categoryMove(@RequestBody @Valid CategoryMoveCommand command){
        categoryService.categoryMove(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
