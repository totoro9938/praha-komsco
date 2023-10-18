package com.cp.praha.board.resourceboard.web;

import com.cp.praha.board.notice.service.request.NoticeDocSelectPageCommand;
import com.cp.praha.board.resourceboard.service.EventBoardService;
import com.cp.praha.board.resourceboard.service.request.EventBoardInsertCommand;
import com.cp.praha.board.resourceboard.service.request.EventBoardUpdateCommand;
import com.cp.praha.board.resourceboard.service.response.EventBoardSelectItemDomain;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.util.IpUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/board/v1")
@Secured("ROLE_BOARD_EVENT_SELECT")
public class EventBoardRestController {

    private final EventBoardService eventBoardService;

    /**
     * USP_DOC_SEL_PAGE
     * 게시판 페이지 조회
     */
    @GetMapping("/event-board/select/page")
    public GridDomain eventBoardSelectPage(@Valid NoticeDocSelectPageCommand command) {
        return eventBoardService.eventBoardDocSelectPage(command);
    }

    /**
     * USP_DOC_SEL_ITEM
     *  게시판 상세보기 조회
     */
    @GetMapping("/event-board/select/item/{eventUuid}")
    @Secured("ROLE_BOARD_EVENT_DETAIL_SELECT")
    public EventBoardSelectItemDomain eventBoardSelectItem(@PathVariable String eventUuid) {
        return eventBoardService.eventBoardSelectItem(eventUuid);
    }

    /**
     *  USP_DOC_INS
     *  게시판 글 등록
     */
    @PostMapping("/event-board/insert")
    @Secured("ROLE_BOARD_EVENT_INSERT")
    public ResponseEntity<HttpStatus> eventBoardInsert(HttpServletRequest request, @RequestBody @Valid EventBoardInsertCommand command) {
        String ip = IpUtil.getClientIP(request);
        eventBoardService.eventBoardInsert(ip, command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_DOC_UPT
     *  게시판 글 수정
     */
    @PutMapping("/event-board/update")
    @Secured("ROLE_BOARD_EVENT_DETAIL_UPDATE")
    public ResponseEntity<HttpStatus> eventBoardUpdate(HttpServletRequest request, @RequestBody @Valid EventBoardUpdateCommand command) {
        String ip = IpUtil.getClientIP(request);
        eventBoardService.eventBoardUpdate(ip, command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_DOC_DEL
     *  공지사항 삭제
     */
    @PutMapping("/event-board/delete/{eventId}")
    @Secured("ROLE_BOARD_EVENT_DETAIL_DELETE")
    public ResponseEntity<HttpStatus> eventSelectItem(@PathVariable int eventId) {
        eventBoardService.eventBoardDelete(eventId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
