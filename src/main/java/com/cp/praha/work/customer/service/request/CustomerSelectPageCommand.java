package com.cp.praha.work.customer.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class CustomerSelectPageCommand {

    private String startDate;
    private String endDate;
    private String custType;
    private String searchType;
    private String searchTxt;
    private String smsYn;
    private String telYn;
    private String sortType;
    private Integer page;
    private Integer totalPage;

}
