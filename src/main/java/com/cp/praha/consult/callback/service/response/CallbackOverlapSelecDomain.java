package com.cp.praha.consult.callback.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
public class CallbackOverlapSelecDomain {
    private String companyCd;
    @Id
    private int callbackId;
    private ZonedDateTime callbackDt;
}
