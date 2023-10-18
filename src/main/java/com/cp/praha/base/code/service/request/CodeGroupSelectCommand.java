package com.cp.praha.base.code.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CodeGroupSelectCommand {
    private String useYn;
    private String sysYn;
    private String delYn;
    private String sortType;
}
