package com.cp.praha.consult.reservation.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
public class VisitorReserveInsertCommand {

    @NotNull
    private Long boundId;
    @NotNull
    private Long callId;
    private String boundTelNo;

}
