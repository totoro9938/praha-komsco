package com.cp.praha.consult.reservation.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ReservationListSelectItemCommand {

    private Integer boundId;
    private Integer callId;

}
