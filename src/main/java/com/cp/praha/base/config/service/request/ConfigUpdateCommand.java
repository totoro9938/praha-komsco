package com.cp.praha.base.config.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@ToString
@Getter
@Setter
public class ConfigUpdateCommand {
    private int configId;
    private int configIdx;
    @NotBlank(message = "환경변수명은 필수입니다.")
    private String configNm;
    @NotBlank(message = "환경변수키는 필수입니다.")
    private String configKey;
    private String configValue;
    private String sysYn;
    private String useYn;
    private String delYn;
    private String description;
    private int mdfrId;
}
