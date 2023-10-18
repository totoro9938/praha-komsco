package com.cp.praha.work.area.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AreaDeleteCommand {
    private String companyCd;
    private int areaId;
    private int mdfrId;
}
