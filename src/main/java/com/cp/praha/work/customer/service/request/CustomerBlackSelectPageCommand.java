package com.cp.praha.work.customer.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CustomerBlackSelectPageCommand {

    private String startDate;
    private String endDate;
    private String custType;
    private String searchType;
    private String searchTxt;
    private String sortType;
    private String outputYn;
    private Integer page;
    private Integer totalPage;
}
