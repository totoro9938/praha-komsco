package com.cp.praha.board.message.web;

import com.cp.praha.board.message.service.MessageService;
import com.cp.praha.board.message.service.request.*;
import com.cp.praha.board.message.service.response.MessageDeptUserSelectDomain;
import com.cp.praha.board.message.service.response.MessageGroupMemberSelectDomain;
import com.cp.praha.board.message.service.response.MessageGroupSelectDomain;
import com.cp.praha.board.message.service.response.MessageRcvSelecItemtDomain;
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
@Secured("ROLE_BOARD_MESSAGE_SELECT")
public class MessageRestController {

    private final MessageService messageService;
    private final WebSocketService webSocketService;

    /**
     *  USP_MESSAGE_SEL_PAGE
     *  쪽지 리스트 조회
     */
    @GetMapping("/message/select/page")
    public GridDomain manualSelectPage(MessageSelectPageCommand command) {
        return messageService.messageSelectPage(command);
    }


    /**
     * USP_MESSAGE_DEPT_USER_SEL
     * 부서별 사용자 조회
     */
    @GetMapping("/message/dept/user/select")
    public List<MessageDeptUserSelectDomain> messageDeptUserSelect(@Valid MessageDeptUserSelectCommand command) {
        return messageService.messageDeptUserSelect(command);
    }

    /**
     * USP_MESSAGE_GROUP_SEL
     * 쪽지 그룹 조회
     */
    @GetMapping("/message/group/select")
    public List<MessageGroupSelectDomain> messageGroupSelect() {
        return messageService.messageGroupSelect();
    }

    /**
     * USP_MESSAGE_GROUP_MEMBER_SEL
     * 메시지 그룹별 멤버 조회
     */
    @GetMapping("/message/group/member/select")
    public List<MessageGroupMemberSelectDomain> messageGroupMemberSelect(@Valid MessageGroupMemberSelectCommand command) {
        return messageService.messageGroupMemberSelect(command);
    }

    /**
     *  USP_MESSAGE_GROUP_SAV
     *  메시지 그룹 저장
     */
    @PostMapping("/message/group/insert")
    @Secured("ROLE_BOARD_MESSAGE_INSERT")
    public ResponseEntity<HttpStatus> messageGroupInsert(@RequestBody @Valid MessageGroupSaveCommand command) {
        messageService.messageGroupInsert(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MESSAGE_GROUP_DEL
     *  메시지 그룹 삭제
     */
    @DeleteMapping("/message/group/delete")
    @Secured("ROLE_BOARD_MESSAGE_DELETE")
    public ResponseEntity<HttpStatus> messageGroupDelete(@RequestBody MessageGroupDeleteCommand command) {
        messageService.messageGroupDelete(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MESSAGE_INS
     *  쪽지 등록
     */
    @PostMapping("/message/insert")
    @Secured("ROLE_BOARD_MESSAGE_INSERT")
    public ResponseEntity<HttpStatus> messageInsert(@RequestBody @Valid MessageInsertCommand command) {
        var srcId2 = messageService.messageInsert(command);
        var srcId1 = AlarmSrcId.MESSAGE;
        webSocketService.alarmSourceSend(srcId1, String.valueOf(srcId2));

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MESSAGE_IMPORTANCE_UPT
     *  쪽지 중요표시 업데이트
     */
    @PutMapping("/message/importance/update")
    @Secured("ROLE_BOARD_MESSAGE_UPDATE")
    public ResponseEntity<HttpStatus> messageImportanceUpdate(@RequestBody @Valid MessageImportanceCommand command) {
        messageService.messageImportanceUpdate(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MESSAGE_IMPORTANCE_UPT
     *  쪽지 중요표시 업데이트
     */
    @PutMapping("/message/receive/importance/update")
    @Secured("ROLE_BOARD_MESSAGE_UPDATE")
    public ResponseEntity<HttpStatus> messageReceiveImportanceUpdate(@RequestBody @Valid MessageRecevieImportanceCommand command) {
        messageService.messageReceiveImportanceUpdate(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_MESSAGE_DEL
     *  쪽지 삭제
     */
    @PutMapping("/message/delete")
    @Secured("ROLE_BOARD_MESSAGE_DELETE")
    public ResponseEntity<HttpStatus> messageDelete(@RequestBody @Valid MessageDeleteCommand command) {
        messageService.messageDelete(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_MESSAGE_RCV_SEL_ITEM
     *  보낸 쪽지 수신자 리스트 조회
     */
    @GetMapping("/message/select/rcv/{messageUuid}")
    public List<MessageRcvSelecItemtDomain> messageRcvSelectItem(@PathVariable String messageUuid) {
        return messageService.messageRcvSelectItem(messageUuid);
    }

    /**
     * USP_VISITOR_MESSAGE_READ_INS
     *  쪽지 확인
     */
    @GetMapping("/message/read/insert/{messageId}")
    public ResponseEntity<HttpStatus> messageReadInsert(HttpServletRequest request, @PathVariable int messageId) {
        String ip = IpUtil.getClientIP(request);
        messageService.messageReadInsert(ip, messageId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
