package com.cp.praha.base.user.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserSelectPageCommand {

    private Integer parentId;
    private Integer deptId;
    private Integer userId;
    private String useYn;
    private Integer groupUid;
    private String ctiYn;
    private String searchType;
    private String searchTxt;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;

}
