package com.cp.praha.base.code.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CodeSelectCommand {
    private String codeGroupCd;
    private int    parentId;
    private String useYn;
    private String sysYn;
    private String delYn;
    private String sortType;
}
