package com.cp.praha.base.user.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
public class UserUpdateIndexCommand {

    @NotNull(message = "아이디는 필수입니다.")
    private Integer userId;
    @NotNull(message = "인덱스는 필수입니다.")
    private Integer userIdx;
    private Integer mdfrId;

}
