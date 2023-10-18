package com.cp.praha.base.user.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
public class UserPasswordResetCommand {

    @NotNull(message = "아이디는 필수입니다.")
    private Integer userId;
    private String userPwd;
    private String ip;
    private Integer rgtrId;

}
