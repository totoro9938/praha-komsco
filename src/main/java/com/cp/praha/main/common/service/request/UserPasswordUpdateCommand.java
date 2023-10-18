package com.cp.praha.main.common.service.request;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;

import javax.validation.constraints.NotBlank;

@Slf4j
@Setter
@Getter
@ToString
@RequiredArgsConstructor
public class UserPasswordUpdateCommand {

    private String userCd;

    @NotBlank(message = "현채 패스워드는 필수 항목입니다.")
    private String userPwd;
    @NotBlank(message = "변경할 패스워드는 필수 항목입니다.")
    private String userPwdChange;
    @NotBlank(message = "변경할 패스워드는 필수 항목입니다.")
    private String password;

    private String ip;
}
