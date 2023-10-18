package com.cp.praha.work.employee.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EmployeeSelPageCommand {
    private String searchType;
    private String searchTxt;
    private String statNm;
    private String sortType;
    private String outputYn;
    private int page;
    private int totalPage;
}
