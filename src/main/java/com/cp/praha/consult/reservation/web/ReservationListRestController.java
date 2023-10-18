package com.cp.praha.consult.reservation.web;

import com.cp.praha.common.domain.GridDomain;
import com.cp.praha.common.security.UserInfo;
import com.cp.praha.common.util.IpUtil;
import com.cp.praha.consult.reservation.service.ReservationListService;
import com.cp.praha.consult.reservation.service.request.*;
import com.cp.praha.consult.reservation.service.response.ReservationSelectItemDomain;
import com.cp.praha.consult.reservation.service.response.VisitorReserveSelectDomain;
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
@RequestMapping("/consult/v1")
@Secured("ROLE_CONSULT_RESERVE_LIST_SELECT")
public class ReservationListRestController {

    private final ReservationListService reservationListService;
    private final UserInfo userInfo;
    private final WebSocketService webSocketService;

    /**
     *  USP_RESERVATION_UPT
     *  예약상담 수정
     */
    @Secured("ROLE_CONSULT_RESERVE_LIST_UPDATE")
    @PutMapping("/reservation/update")
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
     * USP_RESERVATION_SEL_ITEM
     * 예약상담 단건 조회
     */
    @Secured("ROLE_CONSULT_RESERVE_LIST_SELECT")
    @GetMapping("/reservation-item")
    public ReservationSelectItemDomain reservationSelectItem(ReservationListSelectItemCommand reservationListSelectItemCommand) {
        return reservationListService.reservationSelectItem(reservationListSelectItemCommand);
    }

    /**
     * USP_RESERVATION_SEL_PAGE
     * 예약상담 페이지 조회
     */
    @Secured("ROLE_CONSULT_RESERVE_LIST_SELECT")
    @GetMapping("/reservation-page/select")
    public GridDomain reservationSelectPage(ReservationSelectPageCommand reservationSelectPageCommand) {
        return reservationListService.reservationSelectPage(reservationSelectPageCommand);
    }

    /**
     *  USP_VISITOR_RESERVE_INS
     *  예약전화걸기 시도(전화걸기를 할 때 호출되는 프로시저)
     */
    @Secured("ROLE_CONSULT_RESERVE_LIST_INSERT")
    @PostMapping("/visitor-reserve/insert")
    public ResponseEntity<HttpStatus> visitorReserveInsert(HttpServletRequest request, @RequestBody @Valid VisitorReserveInsertCommand visitorReserveInsertCommand) {
        String ip = IpUtil.getClientIP(request);
        reservationListService.visitorReserveInsert(ip, visitorReserveInsertCommand);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     *  USP_VISITOR_RESERVE_SEL
     *  예약시도횟수내역조회
     */
    @Secured("ROLE_CONSULT_RESERVE_LIST_SELECT")
    @GetMapping("/visitor-reserve/select")
    public List<VisitorReserveSelectDomain> visitorReserveSelect(VisitorReserveSelectCommand visitorReserveSelectCommand) {
        return reservationListService.visitorReserveSelect(visitorReserveSelectCommand);
    }

}
