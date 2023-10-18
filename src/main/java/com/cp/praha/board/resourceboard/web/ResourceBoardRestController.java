package com.cp.praha.board.resourceboard.web;

import com.cp.praha.board.freeboard.service.FreeBoardService;
import com.cp.praha.board.freeboard.service.request.FreeBoardDocReplyInsertCommand;
import com.cp.praha.board.freeboard.service.request.FreeBoardDocReplyUpdateCommand;
import com.cp.praha.board.freeboard.service.response.FreeBoardDocReplySelectDomain;
import com.cp.praha.board.notice.service.request.NoticeDocInsertCommand;
import com.cp.praha.board.notice.service.request.NoticeDocSelectItemCommand;
import com.cp.praha.board.notice.service.request.NoticeDocSelectPageCommand;
import com.cp.praha.board.notice.service.request.NoticeDocUpdateCommand;
import com.cp.praha.board.notice.service.response.NoticeDocSelectItemDomain;
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
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/board/v1")
@Secured("ROLE_BOARD_RESOURCE_ROOM_SELECT")
public class ResourceBoardRestController {

    private final FreeBoardService freeBoardService;

    /**
     * USP_DOC_SEL_PAGE
     * 게시판 페이지 조회
     */
    @GetMapping("/resource-board/select/page")
    public GridDomain resourceBoardSelectPage(@Valid NoticeDocSelectPageCommand command) {
        return freeBoardService.freeBoardDocSelectPage(command);
    }

    /**
     * USP_DOC_SEL_ITEM
     *  게시판 상세보기 조회
     */
    @GetMapping("/resource-board/select/item")
    @Secured("ROLE_BOARD_RESOURCE_ROOM_DETAIL_SELECT")
    public NoticeDocSelectItemDomain resourceBoardSelectItem(@Valid NoticeDocSelectItemCommand command) {
        return freeBoardService.freeBoardSelectItem(command);
    }

    /**
     *  USP_DOC_INS
     *  게시판 글 등록
     */
    @PostMapping("/resource-board/insert")
    @Secured("ROLE_BOARD_RESOURCE_ROOM_INSERT")
    public ResponseEntity<HttpStatus> resourceBoardInsert(HttpServletRequest request, @RequestBody @Valid NoticeDocInsertCommand command) {
        String ip = IpUtil.getClientIP(request);
        freeBoardService.freeBoardInsert(ip, command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_DOC_UPT
     *  게시판 글 수정
     */
    @PutMapping("/resource-board/update")
    @Secured("ROLE_BOARD_RESOURCE_ROOM_DETAIL_UPDATE")
    public ResponseEntity<HttpStatus> resourceBoardUpdate(HttpServletRequest request, @RequestBody @Valid NoticeDocUpdateCommand command) {
        String ip = IpUtil.getClientIP(request);
        freeBoardService.freeBoardUpdate(ip, command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_DOC_DEL
     *  공지사항 삭제
     */
    @PutMapping("/resource-board/delete/{docId}")
    @Secured("ROLE_BOARD_RESOURCE_ROOM_DETAIL_DELETE")
    public ResponseEntity<HttpStatus> noticeSelectItem(@PathVariable int docId) {
        freeBoardService.freeBoardDelete(docId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_DOC_REPLY_INS
     *  게시판 댓글 등록
     */
    @PostMapping("/resource-board/reply/insert")
    public ResponseEntity<HttpStatus> resourceBoardReplyInsert(HttpServletRequest request, @RequestBody @Valid FreeBoardDocReplyInsertCommand command) {
        String ip = IpUtil.getClientIP(request);
        freeBoardService.freeBoardReplyInsert(ip, command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_DOC_REPLY_UPT
     *  게시판 댓글 수정
     */
    @PutMapping("/resource-board/reply/update")
    public ResponseEntity<HttpStatus> resourceBoardReplyUpdate(HttpServletRequest request, @RequestBody @Valid FreeBoardDocReplyUpdateCommand command) {
        String ip = IpUtil.getClientIP(request);
        freeBoardService.freeBoardReplyUpdate(ip, command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_DOC_REPLY_SEL
     *  게시판 댓글 조회
     */
    @GetMapping("/resource-board/reply/select/{docUuid}")
    public List<FreeBoardDocReplySelectDomain> resourceBoardReplySelect(@PathVariable String docUuid) {
        return freeBoardService.freeBoardReplySelect(docUuid);
    }

}
