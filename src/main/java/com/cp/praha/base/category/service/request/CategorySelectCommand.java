package com.cp.praha.base.category.service.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class CategorySelectCommand {
    private String treeYn;
    private String catGroupCd;
    private Integer parentId;
    private String useYn;
    private String delYn;
    private String outputYn;
    private String sortType;
}
