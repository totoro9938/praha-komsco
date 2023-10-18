package com.cp.praha.knowledge.manualconsult.web;

import com.cp.praha.base.category.service.CategoryService;
import com.cp.praha.base.category.service.request.CategoryTreeCommand;
import com.cp.praha.base.category.service.response.CategoryTreeDomain;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.util.IpUtil;
import com.cp.praha.knowledge.manualconsult.service.ManualConsultService;
import com.cp.praha.knowledge.manualconsult.service.request.ManualConsultKeywordSelectCommand;
import com.cp.praha.knowledge.manualconsult.service.request.ManualConsultSelectPageCommand;
import com.cp.praha.knowledge.manualconsult.service.response.ManualConsultKeywordSelectDomain;
import com.cp.praha.knowledge.manualmanager.service.ManualManagerService;
import com.cp.praha.knowledge.manualmanager.service.request.ManualSelectItemCommand;
import com.cp.praha.knowledge.manualmanager.service.response.ManualSelectItemDomain;
import com.cp.praha.knowledge.manualqna.service.request.ManualSelectQnaCommand;
import com.cp.praha.knowledge.manualqna.service.response.ManualSelectQnaDomain;
import com.cp.praha.knowledge.manualrelation.service.request.ManualRelationSelectCommand;
import com.cp.praha.knowledge.manualrelation.service.response.ManualRelationSelectDomain;
import com.cp.praha.knowledge.manualrequest.service.ManualRequestService;
import com.cp.praha.knowledge.manualrequest.service.request.ManualRequestInsertCommand;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/knowledge/v1")
@Secured("ROLE_CONSULT_MANUAL_LIST_SELECT")
public class ManualConsultRestController {

    private final ManualConsultService manualConsultService;
    private final CategoryService categoryService;
    private final ManualManagerService manualManagerService;
    private final ManualRequestService manualRequestService;

    /**
     * USP_MANUAL_SEARCH_SEL_PAGE
     * 상담DB 매뉴얼 리스트 조회
     */
    @GetMapping("/manual-consult/select/page")
    public GridDomain manualConsultSelectPage(ManualConsultSelectPageCommand command) {
        return manualConsultService.manualConsultSelectPage(command);
    }

    /**
     * USP_MANUAL_SEARCH_KEYWORD_SEL
     * 상담DB 키워드 조회
     */
    @GetMapping("/manual-consult/keyword/select")
    public List<ManualConsultKeywordSelectDomain> manualConsultSelectPage(ManualConsultKeywordSelectCommand command) {
        return manualConsultService.manualConsultKeywordSelect(command);
    }

    /**
     * USP_MANUAL_KEYWORD_CNT
     * 상담DB 검색순위자료 생성
     */
    @PostMapping("/manual-consult/insert/{keyword}")
    public ResponseEntity<HttpStatus> manualConsultInsertKeyword(@PathVariable String keyword){
        manualConsultService.manualKeywordCount(keyword);
        return new ResponseEntity<>(HttpStatus.OK);
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
     *  USP_MANUAL_SEL_ITEM
     *  매뉴얼 단건조회
     */
    @GetMapping("/manual-consult/manual/item/select")
    @Secured("ROLE_CONSULT_MANUAL_DETAIL_VIEW_SELECT")
    public ManualSelectItemDomain manualSelectItem(ManualSelectItemCommand manualSelectItemCommand) {
        return manualManagerService.manualSelectItem(manualSelectItemCommand);
    }

    /**
     *  USP_MANUAL_REQUEST_INS
     *  매뉴얼 요청 저장
     */
    @PostMapping("/manual-consult/request/insert")
    @Secured("ROLE_CONSULT_MANUAL_DETAIL_VIEW_SELECT")
    public ResponseEntity<HttpStatus> manualRequestInsert(@RequestBody @Valid ManualRequestInsertCommand manualRequestInsertCommand) {
        manualRequestService.manualRequestInsert(manualRequestInsertCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MANUAL_SEL_QNA
     *  매뉴얼 QNA 조회
     */
    @GetMapping("/manual-consult/qna/select")
    @Secured("ROLE_CONSULT_MANUAL_DETAIL_VIEW_SELECT")
    public List<ManualSelectQnaDomain> manualSelectQna(ManualSelectQnaCommand manualSelectQnaCommand) {
        return manualManagerService.manualSelectQna(manualSelectQnaCommand);
    }


    @GetMapping("/manual-consult/relation/select")
    @Secured("ROLE_CONSULT_MANUAL_DETAIL_VIEW_SELECT")
    public List<ManualRelationSelectDomain> manualRelationSelect(ManualRelationSelectCommand manualRelationSelectCommand) {
        return manualManagerService.manualRelationSelect(manualRelationSelectCommand);
    }

    /**
     * USP_VISITOR_MANUAL_READ_INS
     *  메뉴얼 조회수 counting
     */
    @PostMapping("/manual-consult/read/insert/{manualId}")
    public ResponseEntity<HttpStatus> manualReadInsert(HttpServletRequest request, @PathVariable int manualId) {
        String ip = IpUtil.getClientIP(request);
        manualManagerService.manualVisitorReadInsert(manualId, ip);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
