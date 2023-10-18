package com.cp.praha.main.login.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Setter
@Getter
public class UserLoginCommand {

    private String companyCd = "CENTERLINK";
    @NotEmpty
    private String userCd;
    @NotEmpty
    private String userPwd;
    private String ip;
    private String url;
    private int authNumber;
}
