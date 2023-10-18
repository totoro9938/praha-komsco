package com.cp.praha.knowledge.manualscript.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ManualScriptSelectCommand {
    private String companyCd;
    private String koreaYn;
    private String scriptNm;
}
