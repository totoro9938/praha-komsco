package com.cp.praha.consult.reservation.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class VisitorReserveSelectCommand {

    private Long boundId;
    private Long callId;

}
