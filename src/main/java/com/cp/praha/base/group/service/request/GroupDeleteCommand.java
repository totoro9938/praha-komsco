package com.cp.praha.base.group.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

@Getter @Setter
public class GroupDeleteCommand {

    @NotNull(message = "그룹아이디는 필수입니다.")
    private Integer groupUid;
    private Integer userId;

}
