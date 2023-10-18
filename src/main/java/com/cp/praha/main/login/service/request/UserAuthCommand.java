package com.cp.praha.main.login.service.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Setter
@Getter
public class UserAuthCommand {
    @NotEmpty
    private String companyCd = "CENTERLINK";
    @NotEmpty
    private Integer userId;

    @Builder
    public UserAuthCommand(Integer userId) {
        this.userId = userId;
    }
}
