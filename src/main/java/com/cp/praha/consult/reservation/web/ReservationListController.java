package com.cp.praha.consult.reservation.web;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Slf4j
@Controller
@RequiredArgsConstructor
@Secured("ROLE_CONSULT_RESERVE_LIST_SELECT")
public class ReservationListController {

    @RequestMapping("/reservation-list")
    public String reservationList() {
        return "consult/reservation";
    }
}
