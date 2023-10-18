package com.cp.praha.base.group.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GroupSelectCommand {

    private Integer groupUid;
    private String outputYn;
}
