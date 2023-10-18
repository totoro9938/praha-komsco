package com.cp.praha.board.notice.web;

import com.cp.praha.board.notice.service.NoticeService;
import com.cp.praha.board.notice.service.request.*;
import com.cp.praha.board.notice.service.response.NoticeDocDeptUserSelectDomain;
import com.cp.praha.board.notice.service.response.NoticeDocSelectItemDomain;
import com.cp.praha.board.notice.service.response.NoticeDocVisitorReadSelectDomain;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.util.IpUtil;
import com.cp.praha.main.common.entity.AlarmSrcId;
import com.cp.praha.main.common.service.WebSocketService;
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
@RequestMapping("/board/v1")
@Secured("ROLE_BOARD_NOTICE_SELECT")
public class NoticeRestController {

    private final NoticeService noticeService;
    private final WebSocketService webSocketService;

    /**
     * USP_DOC_SEL_PAGE
     * 공지사항 페이지 조회
     */
    @GetMapping("/notice/select/page")
    public GridDomain noticeSelectPage(@Valid NoticeDocSelectPageCommand command) {
        return noticeService.noticeDocSelectPage(command);
    }

    /**
     * USP_DOC_DEPT_USER_SEL
     * 부서별 사용자 조회
     */
    @GetMapping("/notice/dept/user/select")
    public List<NoticeDocDeptUserSelectDomain> noticeDeptUserSelect(@Valid NoticeDocDeptUserSelectCommand command) {
        return noticeService.noticeDocDeptUserSelect(command);
    }

    /**
     * USP_DOC_SEL_ITEM
     *  공지사항 상세보기 조회
     */
    @GetMapping("/notice/select/item")
    @Secured("ROLE_BOARD_NOTICE_DETAIL_SELECT")
    public NoticeDocSelectItemDomain noticeSelectItem(@Valid NoticeDocSelectItemCommand command) {
        return noticeService.noticeSelectItem(command);
    }

    /**
     *  USP_DOC_INS
     *  공지사항 글 등록
     */
    @PostMapping("/notice/insert")
    @Secured("ROLE_BOARD_NOTICE_NEW_INSERT")
    public ResponseEntity<HttpStatus> boardInsert(HttpServletRequest request, @RequestBody @Valid NoticeDocInsertCommand command) {
        String ip = IpUtil.getClientIP(request);
        var srcId2 = noticeService.boardInsert(ip, command);
        var srcId1 = AlarmSrcId.DOC;
        webSocketService.alarmSourceSend(srcId1,String.valueOf(srcId2));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_DOC_UPT
     *  공지사항 글 수정
     */
    @PutMapping("/notice/update")
    @Secured("ROLE_BOARD_NOTICE_DETAIL_UPDATE")
    public ResponseEntity<HttpStatus> boardUpdate(HttpServletRequest request, @RequestBody @Valid NoticeDocUpdateCommand command) {
        String ip = IpUtil.getClientIP(request);
        noticeService.boardUpdate(ip, command);
        var srcId2 = command.getDocUuid();
        var srcId1 = AlarmSrcId.DOC;
        webSocketService.alarmSourceSend(srcId1,String.valueOf(srcId2));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_DOC_DEL
     *  공지사항 삭제
     */
    @PutMapping("/notice/delete/{docId}")
    @Secured("ROLE_BOARD_NOTICE_DETAIL_DELETE")
    public ResponseEntity<HttpStatus> noticeSelectItem(@PathVariable int docId) {
        noticeService.noticeDelete(docId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_VISITOR_DOC_READ_INS
     *  공지사항 조회수 counting
     */
    @PostMapping("/notice/read/insert/{docId}")
    public ResponseEntity<HttpStatus> noticeReadInsert(HttpServletRequest request, @PathVariable int docId) {
        String ip = IpUtil.getClientIP(request);
        noticeService.noticeVisitorReadInsert(docId, ip);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_VISITOR_DOC_READ_SEL
     *  공지사항 조회자 정보 조회
     */
    @GetMapping("/notice/read/select/{docId}")
    @Secured("ROLE_BOARD_NOTICE_EXTEND_01")
    public List<NoticeDocVisitorReadSelectDomain> noticeReadSelect(@PathVariable int docId) {
        return noticeService.noticeVisitorReadSelect(docId);
    }
}
