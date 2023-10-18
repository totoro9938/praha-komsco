package com.cp.praha.consult.callback.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class VisitorCallbackSelectDomain {
    @Id
    private ZonedDateTime boundDt;
    private String boundTelNo;
    private String rgtrNm;

}
