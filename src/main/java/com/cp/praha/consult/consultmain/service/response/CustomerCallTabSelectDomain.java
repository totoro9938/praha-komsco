package com.cp.praha.consult.consultmain.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class CustomerCallTabSelectDomain {
  @Id
  private Integer reservationCnt;
  private Integer callbackCnt;
  private String callbackUuid;
}
