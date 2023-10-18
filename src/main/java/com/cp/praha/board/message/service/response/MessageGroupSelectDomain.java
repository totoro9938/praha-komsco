package com.cp.praha.board.message.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class MessageGroupSelectDomain {
    private Integer userId;
    @Id
    private Integer messageGroupId;
    private Integer messageGroupIdx;
    private String messageGroupNm;
    private Integer messageGroupMemberCnt;
}
