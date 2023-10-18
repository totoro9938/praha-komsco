package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@ToString
public class UserFindPageCommand {
    @NotNull(message = "고객 정보는 필수입니다.")
    private int     deptId;
    private String  description;
    private String  userNm;
    private String  searchType;
    private String  searchTxt;
    private String  userUseYn;
    private String  sortType;
    private int     page;
    private int     totalPage;
}
