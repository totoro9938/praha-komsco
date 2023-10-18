package com.cp.praha.base.group.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter @Setter
public class GroupInsertCommand {

    @NotBlank
    private Integer parentId;
    private String groupUuid;
    private Integer groupIdx;
    @NotBlank(message = "그룹명은 필수입니다.")
    private String groupNm;
    private String description;
    private String adminYn;
    private String ip;
    private Integer userId;

}
