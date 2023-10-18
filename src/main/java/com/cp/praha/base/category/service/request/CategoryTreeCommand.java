package com.cp.praha.base.category.service.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@Builder
@ToString
public class CategoryTreeCommand {

    private String catGroupCd;
    private int parentId;
    private String useYn;
    private String delYn;
    private String outputYn;
    private String sortType;

}
