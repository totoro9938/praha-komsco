package com.cp.praha.knowledge.manualrequest.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.knowledge.manualmanager.service.ManualManagerService;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectItemCommand;
import com.cp.praha.knowledge.manualmanager.service.response.ManualSelectItemDomain;
import com.cp.praha.knowledge.manualqna.service.request.ManualSelectQnaCommand;
import com.cp.praha.knowledge.manualqna.service.response.ManualSelectQnaDomain;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationSelectCommand;
import com.cp.praha.knowledge.manualrelation.service.response.ManualRelationSelectDomain;
import com.cp.praha.knowledge.manualrequest.service.ManualRequestService;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestInsertCommand;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestRejectCommand;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestSelectItemCommand;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestSelectPageCommand;
import com.cp.praha.knowledge.manualrequest.service.response.ManualRequestSelectItemDomain;
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
@Secured("ROLE_WORK_REQUEST_MANUAL_LIST_SELECT")
public class ManualRequestRestController {

    private final ManualRequestService manualRequestService;
    private final ManualManagerService manualManagerService;

    /**
     *  USP_MANUAL_REQUEST_INS
     *  매뉴얼 요청 저장
     */
    @PostMapping("/manual-request/insert")
    @Secured("ROLE_WORK_REQUEST_MANUAL_LIST_INSERT")
    public ResponseEntity<HttpStatus> manualRequestInsert(@RequestBody @Valid ManualRequestInsertCommand manualRequestInsertCommand) {
        manualRequestService.manualRequestInsert(manualRequestInsertCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MANUAL_REQUEST_SEL_ITEM
     *  매뉴얼 요청 상세조회
     */
    @GetMapping("/manual-request-item/select")
    public ManualRequestSelectItemDomain manualRequestSelectItem(ManualRequestSelectItemCommand manualRequestSelectItemCommand) {
        return manualRequestService.manualRequestSelectItem(manualRequestSelectItemCommand);
    }

    /**
     *  USP_MANUAL_REQUEST_SEL_PAGE
     *  매뉴얼 요청 페이지 조회
     */
    @GetMapping("/manual-request/select")
    public GridDomain manualRequestSelectPage(ManualRequestSelectPageCommand manualRequestSelectPageCommand) {
        return manualRequestService.manualRequestSelectPage(manualRequestSelectPageCommand);
    }

    /**
     *  USP_MANUAL_REQUEST_REJECT
     *  매뉴얼 요청 반려
     */
    @PutMapping("/manual-request/reject")
    @Secured("ROLE_WORK_REQUEST_MANUAL_LIST_UPDATE")
    public ResponseEntity<HttpStatus> manualRequestReject(@RequestBody @Valid ManualRequestRejectCommand manualRequestRejectCommand) {
        manualRequestService.manualRequestReject(manualRequestRejectCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MANUAL_SEL_ITEM
     *  매뉴얼 단건조회
     */
    @GetMapping("/manual-request/manual/item/select")
    @Secured("ROLE_CONSULT_MANUAL_DETAIL_VIEW_SELECT")
    public ManualSelectItemDomain manualSelectItem(ManualSelectItemCommand manualSelectItemCommand) {
        return manualManagerService.manualSelectItem(manualSelectItemCommand);
    }

    /**
     *  USP_MANUAL_SEL_QNA
     *  매뉴얼 QNA 조회
     */
    @GetMapping("/manual-request/qna/select")
    @Secured("ROLE_CONSULT_MANUAL_DETAIL_VIEW_SELECT")
    public List<ManualSelectQnaDomain> manualSelectQna(ManualSelectQnaCommand manualSelectQnaCommand) {
        return manualManagerService.manualSelectQna(manualSelectQnaCommand);
    }


    @GetMapping("/manual-request/relation/select")
    @Secured("ROLE_CONSULT_MANUAL_DETAIL_VIEW_SELECT")
    public List<ManualRelationSelectDomain> manualRelationSelect(ManualRelationSelectCommand manualRelationSelectCommand) {
        return manualManagerService.manualRelationSelect(manualRelationSelectCommand);
    }

}
