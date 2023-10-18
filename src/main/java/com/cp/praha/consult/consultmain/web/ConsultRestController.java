package com.cp.praha.consult.consultmain.web;

import com.cp.praha.base.category.service.CategoryService;
import com.cp.praha.base.category.service.request.CategoryTreeCommand;
import com.cp.praha.base.category.service.response.CategoryTreeDomain;
import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.Cond;
import com.cp.praha.common.util.IpUtil;
import com.cp.praha.consult.callback.service.CallbackListService;
import com.cp.praha.consult.callback.service.request.CallbackUpdateCommand;
import com.cp.praha.consult.callback.service.request.VisitorCallbackInsertCommand;
import com.cp.praha.consult.callback.service.response.CallbackOverlapSelecDomain;
import com.cp.praha.consult.callback.service.response.CallbackSelectItemDomain;
import com.cp.praha.consult.consultlist.service.ConsultListService;
import com.cp.praha.consult.consultlist.service.request.CallSelectPageCommand;
import com.cp.praha.consult.consultlist.service.response.CallCallCatSelectDomain;
import com.cp.praha.consult.consultmain.service.ConsultService;
import com.cp.praha.consult.consultmain.service.request.*;
import com.cp.praha.consult.consultmain.service.response.*;
import com.cp.praha.consult.reservation.service.ReservationListService;
import com.cp.praha.consult.reservation.service.request.ReservationSelectPageCommand;
import com.cp.praha.consult.reservation.service.request.ReservationUpdateCommand;
import com.cp.praha.consult.reservation.service.request.VisitorReserveInsertCommand;
import com.cp.praha.consult.smslist.service.request.SmsInsertCommand;
import com.cp.praha.main.common.entity.AlarmSrcId;
import com.cp.praha.main.common.service.WebSocketService;
import com.cp.praha.work.area.service.AreaService;
import com.cp.praha.work.area.service.request.AreaSelectPageCommand;
import com.cp.praha.work.area.service.response.AreaSelectItemDomain;
import com.cp.praha.work.area.service.response.AreaSelectPageDomain;
import com.cp.praha.work.customer.service.request.CustomerUpdateCommand;
import com.cp.praha.work.discomfort.service.DiscomfortService;
import com.cp.praha.work.discomfort.service.request.DiscomfortSelCommand;
import com.cp.praha.work.shortcut.service.request.ShortCutSelectCommand;
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
@RequestMapping("/consult/v1")
@Secured("ROLE_CONSULT_MAIN_SELECT")
public class ConsultRestController {
    private final ConsultService consultService;
    private final WebSocketService webSocketService;
    private final CategoryService categoryService;
    private final ReservationListService reservationListService;
    private final CallbackListService callbackListService;
    private final ConsultListService consultListService;
    private final AreaService areaService;
    private final DiscomfortService discomfortService;
    private final UserInfo userInfo;

    /**
     * USP_CUST_FIND_SEL 상담메인 고객조회
     */
    @GetMapping("/customer/customer-search")
    public List<CustomerFindSelectDomain> customerFindSelect(CustomerFindSelectCommand command){
        return consultService.customerFindSelect(command);
    }
    /**
     * USP_CALLTAB_CNT 상담메인 콜백,예약 건수확인
     */
    @GetMapping("/customer/call-tab-cnt")
    public List<CustomerCallTabSelectDomain> customerCallTabSelect(CustomerCallTabSelectCommand command){
        return consultService.customerCallTabSelect(command);
    }
    /**
     * USP_CUST_BLACK_INS 유의고객등록
     */
    @PostMapping("/customer/customer-black-insert")
    public ResponseEntity<HttpStatus> costomerBlackInsert(@RequestBody @Valid CustomerBlackInsertCommand command){
        consultService.costomerBlackInsert(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     * USP_CUST_INS 상담메인 고객저장
     */
    @PostMapping("/customer")
    public String customerInsert(@RequestBody @Valid CustomerInsertCommand command){
        return String.valueOf(consultService.customerInsert(command));
    }

    /**
     * USP_CUST_UPT 상담메인 고객업데이트
     */
    @PutMapping("/customer")
    public ResponseEntity<HttpStatus> customerUpdate(@RequestBody @Valid CustomerUpdateCommand command){
        consultService.customerUpdate(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_USER_DDD 예약상담사 조회
     */
    @GetMapping("/consult/reservation-user-select")
    public List<ReservationAgentSelectDomain> reservationAgentSelect(UserDddCommand command){
        return consultService.reservationAgentSelect(command);
    }

    /**
     * USP_SMS_TEMPLATE_SEL 문자템플릿 조회
     */
    @GetMapping("/consult/sms-template-select/{templateId}")
    public List<SmsTemplateSelectDomain> smsTemplateSelect(@PathVariable("templateId") int templateId){
        return consultService.smsTemplateSelect(templateId);
    }

    /**
     * USP_SMS_INS 문자전송
     */
    @PostMapping("/consult/smsInsert")
    public ResponseEntity<HttpStatus> consultSmsInsert(@RequestBody @Valid SmsInsertCommand command){
        consultService.consultSmsInsert(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_CALL_INS 상담이력 저장
     */
    @PostMapping("/callInsert")
    public ResponseEntity<HttpStatus> callInsert(HttpServletRequest request, @RequestBody @Valid ConusltCallInsertCommand command){
        String ip = IpUtil.getClientIP(request);
        var srcId2 = consultService.callInsert(command,ip);
        /*
         * 예약, 이관 알림 호출
         */
        if(Cond.str(command.getCallType()).in("EmpTransfer","Reservation")){
            var srcId1 = command.getCallType().equals("EmpTransfer") ? AlarmSrcId.TRANSFER:AlarmSrcId.RESERVATION;
            webSocketService.alarmSourceSend(srcId1,String.valueOf(srcId2));
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     * USP_CALL_SEL_PAGE 상담이력 그리드조회
     */
    @GetMapping("/consult-select-page")
    public GridDomain callSelectPage(CallSelectPageCommand command){
        return consultListService.callSelectPage(command);
    }
    /**
     * USP_USER_FIND_PAGE 담당자 찾기
     */
    @GetMapping("/consult/user-find")
    public GridDomain userFindPage(UserFindPageCommand command){
        return consultService.userFindPage(command);
    }


    /**
     * USP_CAT_TREE 카테고리 드롭다운트리
     */
    @GetMapping("consult/cat/treeSelect")
    public List<CategoryTreeDomain> categoryTreeSelect(CategoryTreeCommand command){
        return categoryService.categoryTreeSelect(command);
    }

    @GetMapping("/call-tab/callback/{callbackUuid}")
    public CallbackSelectItemDomain callbackSelectItem(@PathVariable String callbackUuid){
        return callbackListService.callbackSelectItem(callbackUuid);
    }

    @GetMapping("/call-tab/overlap-select/{callbackId}")
    public List<CallbackOverlapSelecDomain> callbackOverlapSelec(@PathVariable int callbackId){
        return callbackListService.callbackOverlapSelec(callbackId);
    }

    @PutMapping("/call-tab/callback")
    public ResponseEntity<HttpStatus> callbackUpdate(@RequestBody @Valid CallbackUpdateCommand command){
        callbackListService.callbackUpdate(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     * USP_BOUND_INS 바운드콜 저장
     */
    @PostMapping("/consult/bound-insert")
    public int boundInsert(HttpServletRequest request, @RequestBody @Valid BoundInsertCommand command){
        String ip = IpUtil.getClientIP(request);
        var boundId = consultService.boundInsert(command,ip);
        return boundId;
    }

    /**
     * USP_RESERVATION_SEL_PAGE
     * 예약상담 페이지 조회
     */
    @GetMapping("/tab/reservation-page/select")
    public GridDomain reservationSelectPage(ReservationSelectPageCommand reservationSelectPageCommand) {
        return reservationListService.reservationSelectPage(reservationSelectPageCommand);
    }

    /**
     *  USP_RESERVATION_UPT
     *  예약상담 수정
     */
    @PutMapping("/tab/reservation/update")
    public ResponseEntity<HttpStatus> reservationUpdate(@RequestBody @Valid ReservationUpdateCommand reservationUpdateCommand) {
        reservationListService.reservationUpdate(reservationUpdateCommand);

        var srcId1 = AlarmSrcId.RESERVATION;
        var srcId2 = reservationUpdateCommand.getCallId();
        var chargeId = reservationUpdateCommand.getChargeId();

        if(chargeId != userInfo.getUser().getUserId()){
            webSocketService.alarmSourceSend(srcId1,String.valueOf(srcId2));
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     * USP_BOUND_UPT 바운드콜 저장
     */
    @PostMapping("/consult/bound-update")
    public ResponseEntity<HttpStatus> boundUpdate(HttpServletRequest request, @RequestBody @Valid BoundUpdateCommand command){
        String ip = IpUtil.getClientIP(request);
        consultService.boundUpdate(command,ip);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/consult/callback/visitor-insert")
    @Secured("ROLE_CONSULT_CALLBACK_LIST_INSERT")
    public ResponseEntity<HttpStatus> visitorCallbackInsert(HttpServletRequest request, @RequestBody @Valid VisitorCallbackInsertCommand command){
        String ip = IpUtil.getClientIP(request);
        callbackListService.visitorCallbackInsert(command,ip);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * USP_CALL_CALL_CAT_SEL 상담이력 상세보기 상담분류 리스트 조회
     */
    @GetMapping("/detail/callCatList")
    public List<CallCallCatSelectDomain> callCatListSelect(CallCallCatCommand command){
        return consultListService.callCatListSelect(command);
    }
    /**
     * USP_SHORTCUT_SEL 단축버튼 조회
     */
    @GetMapping("/short-cut/selcet")
    public List<ShortcutSelectDomain> shortCutSel(ShortCutSelectCommand command){
        return consultService.shortCutSel(command);
    }


    @GetMapping("/area/select/page")
    public List<AreaSelectPageDomain> areaSelectPage(AreaSelectPageCommand command){
        return areaService.areaSelectPage(command);
    }


    @GetMapping("/area/item/{areaUuid}")
    public AreaSelectItemDomain areaSelectItem(@PathVariable("areaUuid") String uuid){
        return areaService.areaSelectItem(uuid);
    }
    /**
     *  USP_VISITOR_RESERVE_INS
     *  예약전화걸기 시도(전화걸기를 할 때 호출되는 프로시저)
     */
    @PostMapping("/main/visitor-reserve/insert")
    public ResponseEntity<HttpStatus> visitorReserveInsert(HttpServletRequest request, @RequestBody @Valid VisitorReserveInsertCommand command) {
        String ip = IpUtil.getClientIP(request);
        reservationListService.visitorReserveInsert(ip, command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     *  USP_CUST_WARNING_INS
     *  경고고객등록요청
     */
    @PostMapping("/cust/waring/insert")
    public ResponseEntity<HttpStatus> custWaringInsert(@RequestBody @Valid CustWarningInsCommand command) {
        consultService.custWaringInsert(command);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    /**
     *  USP_DISCOMFORT_SEL_PAGE
     *  생활불편조회
     */
    @GetMapping("/discomfort/select")
    public GridDomain discomfortSelect(DiscomfortSelCommand command){
        return discomfortService.discomfortSelectPage(command);
    }
}
