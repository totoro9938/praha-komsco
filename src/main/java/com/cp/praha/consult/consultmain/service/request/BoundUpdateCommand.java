package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BoundUpdateCommand {
   private int boundId;
   private String ctiStation;
   private String callDt;
   private String closeCallDt;
}
