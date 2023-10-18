package com.cp.praha.board.message.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class MessageGroupSaveCommand {
    @NotNull(message = "메시지그룹아이디는 필수입니다.")
    @Min(value = 0)
    private Integer messageGroupId;
    private Integer messageGroupIdx;
    private String messageGroupNm;
    private Integer messageGroupMemberCnt;
    private String messageGroupMemberIdList;
    private int userId;
}
