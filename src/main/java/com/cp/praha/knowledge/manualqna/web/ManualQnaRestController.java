package com.cp.praha.knowledge.manualqna.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectPageCommand;
import com.cp.praha.knowledge.manualqna.service.ManualQnaService;
import com.cp.praha.knowledge.manualqna.service.request.ManualDeleteQnaCommand;
import com.cp.praha.knowledge.manualqna.service.request.ManualInsertQnaCommand;
import com.cp.praha.knowledge.manualqna.service.request.ManualSelectQnaCommand;
import com.cp.praha.knowledge.manualqna.service.request.ManualUpdateQnaCommand;
import com.cp.praha.knowledge.manualqna.service.response.ManualSelectQnaDomain;
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
@Secured("ROLE_WORK_QNA_MGR_SELECT")
public class ManualQnaRestController {

    private final ManualQnaService manualQnaService;

    /**
     * USP_MANUAL_SEL_PAGE
     * 매뉴얼 리스트 조회
     */
    @GetMapping("/qna-manual/select/page")
    public GridDomain qnaManualSelectPage(ManualSelectPageCommand command) {
        return manualQnaService.qnaMenualSelectPage(command);
    }

    /**
     * USP_MANUAL_SEL_QNA
     * 메뉴얼 Q&A 조회
     */
    @GetMapping("/qna-manual/select/qna")
    public List<ManualSelectQnaDomain> qnaManualSelectPage(ManualSelectQnaCommand command) {
        return manualQnaService.qnaSelect(command);
    }

    /**
     * USP_MANUAL_QNA_INS
     * 매뉴얼 Q&A 저장
     */
    @PostMapping("/qna-manual/insert")
    @Secured("ROLE_WORK_QNA_MGR_INSERT")
    public ResponseEntity<HttpStatus> manualInsert(@RequestBody @Valid ManualInsertQnaCommand command) {
        manualQnaService.qnaInsert(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_MANUAL_QNA_UPT
     * 매뉴얼 Q&A 업데이트
     */
    @PutMapping("/qna-manual/update")
    @Secured("ROLE_WORK_QNA_MGR_UPDATE")
    public ResponseEntity<HttpStatus> manualUpdate(@RequestBody @Valid ManualUpdateQnaCommand command) {
        manualQnaService.qnaUpdate(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_MANUAL_QNA_DEL
     * 매뉴얼 Q&A 삭제
     */
    @PutMapping("/qna-manual/delete")
    @Secured("ROLE_WORK_QNA_MGR_UPDATE")
    public ResponseEntity<HttpStatus> manualDelete(@RequestBody @Valid ManualDeleteQnaCommand command) {
        manualQnaService.qnaDelete(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
