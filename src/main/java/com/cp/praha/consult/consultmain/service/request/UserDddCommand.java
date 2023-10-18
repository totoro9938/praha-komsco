package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDddCommand {
    private int    deptId;
    private int    parentId;
    private String ctiYn;
    private String useYn;
    private String sortType;
}
