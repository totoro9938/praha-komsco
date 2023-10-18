package com.cp.praha.knowledge.manualmanager.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class ManualUpdateBatchCommand {
  private Integer manualId;
  @NotNull(message = "상담분류 아이디는 필수입니다.")
  private Integer callCatId;
  @NotNull(message = "부서 아이디는 필수입니다.")
  private Integer deptId;
  private Integer chargeId;
}
