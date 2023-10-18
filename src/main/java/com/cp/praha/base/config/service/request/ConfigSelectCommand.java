package com.cp.praha.base.config.service.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@Builder
public class ConfigSelectCommand {
  private String treeYn;
  @NotEmpty
  private Integer parentId;
  private String useYn;
  private String delYn;
  private String outputYn;
}
