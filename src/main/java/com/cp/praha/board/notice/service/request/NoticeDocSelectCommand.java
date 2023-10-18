package com.cp.praha.board.notice.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeDocSelectCommand {
    private String cabinetCd;
    private String searchType;
    private String searchTxt;
    private String startDt;
    private String endDt;
    private String importance;
    private Integer userId;
    private Integer deptId;
    private Integer sortType;
    private Integer outputYn;
}
