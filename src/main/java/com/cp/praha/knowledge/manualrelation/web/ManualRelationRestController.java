package com.cp.praha.knowledge.manualrelation.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectPageCommand;
import com.cp.praha.knowledge.manualrelation.service.ManualRelationService;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationDeleteCommand;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationInsertCommand;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationSelectCommand;
import com.cp.praha.knowledge.manualrelation.service.response.ManualRelationSelectDomain;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/knowledge/v1")
@Secured("ROLE_WORK_RELATE_MANUAL_MGR_SELECT")
public class ManualRelationRestController {

    private final ManualRelationService manualRelationService;

    /**
     * USP_MANUAL_SEL_PAGE
     * 매뉴얼 리스트 조회
     */
    @GetMapping("/manual-relation/select/page")
    public GridDomain manualRelSelectPage(ManualSelectPageCommand command) {
        return manualRelationService.manualRelSelectPage(command);
    }

    /**
     * USP_MANUAL_RELATION_SEL
     * 연관매뉴얼 조회
     */
    @GetMapping("/manual-relation/select/relation")
    public List<ManualRelationSelectDomain> manualRelSelect(ManualRelationSelectCommand command) {
        return manualRelationService.manualRelSelect(command);
    }

    /**
     * USP_MANUAL_RELATION_INS
     *  연관매뉴얼 저장
     */
    @PostMapping("/manual-relation/insert/relation")
    @Secured("ROLE_WORK_RELATE_MANUAL_MGR_INSERT")
    public ResponseEntity<HttpStatus> manualRelInsert(@RequestBody @Valid ManualRelationInsertCommand command) {
        manualRelationService.manualRelInsert(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_MANUAL_RELATION_INS
     *  연관매뉴얼 저장
     */
    @DeleteMapping("/manual-relation/delete/relation")
    @Secured("ROLE_WORK_RELATE_MANUAL_MGR_DELETE")
    public ResponseEntity<HttpStatus> manualRelDelete(@RequestBody @Valid ManualRelationDeleteCommand command) {
        manualRelationService.manualRelDelete(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
