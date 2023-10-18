package com.cp.praha.knowledge.manualmanager.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.validation.CustomCollectionValidator;
import com.cp.praha.knowledge.manualmanager.service.ManualManagerService;
import com.cp.praha.knowledge.manualmanager.service.request.*;
import com.cp.praha.knowledge.manualmanager.service.response.ManualHistorySelectDomain;
import com.cp.praha.knowledge.manualmanager.service.response.ManualHistorySelectItemDomain;
import com.cp.praha.knowledge.manualmanager.service.response.ManualSelectItemDomain;
import com.cp.praha.knowledge.manualqna.service.request.ManualSelectQnaCommand;
import com.cp.praha.knowledge.manualqna.service.response.ManualSelectQnaDomain;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationSelectCommand;
import com.cp.praha.knowledge.manualrelation.service.response.ManualRelationSelectDomain;
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
@RequestMapping("/knowledge/v1")
@Secured("ROLE_WORK_MANUAL_MGR_SELECT")
public class ManualManagerRestController {

    private final CustomCollectionValidator customCollectionValidator;
    private final ManualManagerService manualManagerService;

    /**
     *  USP_MANUAL_INS
     *  매뉴얼 승인
     */
    @PostMapping("/manual/insert")
    @Secured("ROLE_WORK_MANUAL_MGR_INSERT")
    public ResponseEntity<HttpStatus> manualInsert(@RequestBody @Valid ManualInsertCommand manualInsertCommand) {
        manualManagerService.manualInsert(manualInsertCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MANUAL_UPT
     *  매뉴얼수정
     */
    @PutMapping("/manual/update")
    @Secured("ROLE_WORK_MANUAL_MGR_UPDATE")
    public ResponseEntity<HttpStatus> manualUpdate(@RequestBody @Valid ManualUpdateCommand manualUpdateCommand) {
        manualManagerService.manualUpdate(manualUpdateCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MANUAL_UPT_DEPT
     *  매뉴얼 일괄수정
     */
    @PutMapping("/manual/update-batch")
    @Secured("ROLE_WORK_MANUAL_MGR_UPDATE")
    public ResponseEntity<HttpStatus> manualUpdateBatch(@RequestBody @Valid List<ManualUpdateBatchCommand> command, BindingResult bindingResult) throws BindException {
        customCollectionValidator.validate(command, bindingResult);

        if(!bindingResult.hasErrors()) manualManagerService.manualUpdateBatch(command);
        else throw new BindException(bindingResult);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MANUAL_SEL_ITEM
     *  매뉴얼 단건조회
     */
    @GetMapping("/manual-item/select")
    public ManualSelectItemDomain manualSelectItem(ManualSelectItemCommand manualSelectItemCommand) {
        return manualManagerService.manualSelectItem(manualSelectItemCommand);
    }

    /**
     *  USP_MANUAL_SEL_PAGE
     *  매뉴얼 리스트 조회
     */
    @GetMapping("/manual/select")
    public GridDomain manualSelectPage(ManualSelectPageCommand manualSelectPageCommand) {
        return manualManagerService.manualSelectPage(manualSelectPageCommand);
    }

    /**
     *  USP_MANUAL_SEL_QNA
     *  매뉴얼 QNA 조회
     * @return
     */
    @GetMapping("/manual-qna/select")
    @Secured("ROLE_WORK_MANUAL_MGR_QNA_SELECT")
    public List<ManualSelectQnaDomain> manualSelectQna(ManualSelectQnaCommand manualSelectQnaCommand) {
        return manualManagerService.manualSelectQna(manualSelectQnaCommand);
    }

    /**
     *  USP_MANUAL_HISTORY_SEL
     *  매뉴얼 수정 이력
     */
    @GetMapping("/manual-history/select")
    @Secured("ROLE_WORK_MANUAL_MGR_HISTORY_SELECT")
    public List<ManualHistorySelectDomain> manualHistorySelect(ManualHistorySelectCommand manualHistorySelectCommand) {
        return manualManagerService.manualHistorySelect(manualHistorySelectCommand);
    }

    /**
     *  USP_MANUAL_HISTORY_SEL_ITEM
     *  매뉴얼 수정 이전 이력
     */
    @GetMapping("/manual-history/select/item")
    @Secured("ROLE_WORK_MANUAL_MGR_HISTORY_SELECT")
    public ManualHistorySelectItemDomain manualHistorySelectItem(ManualHistorySelectItemCommand command) {
        return manualManagerService.manualHistorySelectItem(command);
    }

    /**
     *  USP_MANUAL_DEL
     *  매뉴얼 삭제
     */
    @DeleteMapping("/manual/delete")
    @Secured("ROLE_WORK_MANUAL_MGR_NEW_DELETE")
    public ResponseEntity<HttpStatus> manualDelete(@RequestBody @Valid ManualDeleteCommand manualDeleteCommand) {
        manualManagerService.manualDelete(manualDeleteCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/manual-relation/select")
    @Secured("ROLE_WORK_RELATE_MANUAL_MGR_SELECT")
    public List<ManualRelationSelectDomain> manualRelationSelect(ManualRelationSelectCommand manualRelationSelectCommand) {
        return manualManagerService.manualRelationSelect(manualRelationSelectCommand);
    }
}
