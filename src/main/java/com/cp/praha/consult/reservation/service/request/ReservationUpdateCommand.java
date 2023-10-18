package com.cp.praha.consult.reservation.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ReservationUpdateCommand {

    @NotNull
    private Integer boundId;
    @NotNull
    private Integer callId;
    @NotNull
    private Integer chargeId;
    private String reservationStatus;
    private String description;

}
