package com.cp.praha.base.logInfo.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LogInfoAclSelectPageCommand {
    private String startDt;
    private String endDt;
    private Integer userId;
    private String userCd;
    private Integer page;
    private Integer totalPage;
}
