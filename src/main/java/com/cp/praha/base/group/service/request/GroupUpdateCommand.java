package com.cp.praha.base.group.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter @Setter
public class GroupUpdateCommand {

    @NotBlank(message = "그룹 아이디는 필수입니다.")
    private Integer groupUid;
    @NotBlank
    private Integer parentId;
    private Integer groupIdx;
    private String groupNm;
    private String description;
    private String adminYn;
    private String ip;
    private Integer userId;

}
