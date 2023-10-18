package com.cp.praha.base.department.web;

import com.cp.praha.base.department.entity.DepartmentSelectAllProc;
import com.cp.praha.base.department.entity.DeptSelItemProc;
import com.cp.praha.base.department.service.DepartmentService;
import com.cp.praha.base.department.service.request.DepartmentInsertCommand;
import com.cp.praha.base.department.service.request.DepartmentMoveCommand;
import com.cp.praha.base.department.service.request.DepartmentSelectCommand;
import com.cp.praha.base.department.service.request.DepartmentUpdateCommand;
import com.cp.praha.base.department.service.response.DepartmentSelectDomain;
import com.cp.praha.base.department.service.response.DepartmentTreeSelectDomain;
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
@Secured("ROLE_BASE_DEPT_MGR_SELECT")
public class DepartmentRestController {
    private final CustomCollectionValidator customCollectionValidator;
    private final DepartmentService departmentService;
    /**
     * USP_DEPT_SEL_ALL 전체 조직정보 조회
     * @return
     */
    @GetMapping("/dept/select-all")
    public List<DepartmentSelectAllProc> deptSelAll(){
        return departmentService.getDeptSelAll();
    }


    @GetMapping("/dept/select/item/{deptUuid}")
    public DeptSelItemProc deptSelItem(@PathVariable String deptUuid){
        return departmentService.deptSelItem(deptUuid);
    }


    /**
     * USP_DEPT_TREE_SEL 트리드롭다운 조직정보
     * @return
     */
    @GetMapping("/dept/select-tree")
    public List<DepartmentTreeSelectDomain> deptTreeSel(){
        return departmentService.getDeptTreeSel();
    }


    /**
     * USP_DEPT_SEL 조직정보 그리드 리스트
     * @return
     */
    @GetMapping("/dept")
    public List<DepartmentSelectDomain> deptSelect(DepartmentSelectCommand command){
        return departmentService.deptSelect(command);
    }

    /**
     * USP_DEPT_INS 조직정보 저장
     * @return
     */
    @Secured("ROLE_BASE_DEPT_MGR_INSERT")
    @PostMapping("/dept")
    public ResponseEntity<HttpStatus> deptInsert(@RequestBody @Valid List<DepartmentInsertCommand> command, BindingResult bindingResult) throws BindException{
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors()) departmentService.deptInsert(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_DEPT_UPT 조직정보 업데이트
     * @return
     */
    @Secured("ROLE_BASE_DEPT_MGR_UPDATE")
    @PutMapping("/dept")
    public ResponseEntity<HttpStatus> deptUpdate(@RequestBody @Valid List<DepartmentUpdateCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors()) departmentService.deptUpdate(command);
        else throw new BindException(bindingResult);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Secured("ROLE_BASE_DEPT_MGR_UPDATE")
    @PutMapping("/dept/item")
    public void deptItemUpdate(@RequestBody @Valid DepartmentUpdateCommand command)  {
       departmentService.deptItemUpdate(command);


    }

    /**
     * USP_DEPT_MOV 조직정보 이동
     * @return
     */
    @Secured("ROLE_BASE_DEPT_MGR_UPDATE")
    @PutMapping("/dept/dept-Move")
    public ResponseEntity<HttpStatus> deptMove(@RequestBody @Valid DepartmentMoveCommand command){
        departmentService.deptMove(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}