package com.cp.praha.common.domain;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class GridDomain {

    private Integer totalCount;
    private Integer curPage;
    private List<?> rows;
}

