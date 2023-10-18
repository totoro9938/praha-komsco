package com.cp.praha.knowledge.manualmanager.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ManualSelectPageCommand {

    private String manualType;
    private Integer callCatId;
    private Integer parentId;
    private Integer deptId;
    private Integer chargeId;
    private String useYn;
    private String searchType;
    private String searchTxt;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;
}
