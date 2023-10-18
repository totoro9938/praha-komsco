package com.cp.praha.consult.consultmain.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class CustomerFindSelectCommand {

    @NotBlank(message = "검색타입은 필수입니다.")
    private String searchType;
    @NotBlank(message = "검색어는 필수입니다.")
    private String searchTxt;
    private int    unitedId;
}
