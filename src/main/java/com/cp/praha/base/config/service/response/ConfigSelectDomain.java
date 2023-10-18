package com.cp.praha.base.config.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
@Entity
public class ConfigSelectDomain {
  private String companyCd;
  @Id
  private String configId;
  private String configUuid;
  private String parentId;
  private String configLvl;
  private String configPath;
  private String sortPath;
  private String keyPath;
  private String configNm;
  private String configKey;
  private String configValue;
  private String sysYn;
  private String inheritSysYn;
  private String useYn;
  private String inheritUseYn;
  private String delYn;
  private String inheritDelYn;
  private String description;
  private String rgtrId;
  private ZonedDateTime regDt;
  private String mdfrId;
  private ZonedDateTime mdfDt;
}
