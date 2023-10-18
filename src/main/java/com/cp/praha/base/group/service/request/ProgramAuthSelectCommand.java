package com.cp.praha.base.group.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProgramAuthSelectCommand {

    private String actorType;
    private Integer actorId;
    private Integer authGroupUid;
    private Integer programId;
    private String useYn;
    private Integer userId;

}
