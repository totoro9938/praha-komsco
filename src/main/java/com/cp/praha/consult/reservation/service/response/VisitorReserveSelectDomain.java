package com.cp.praha.consult.reservation.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class VisitorReserveSelectDomain {
    @Id
    private ZonedDateTime boundDt;
    private String boundTelNo;
    private String rgtrNm;

}
