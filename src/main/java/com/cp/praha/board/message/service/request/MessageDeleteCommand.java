package com.cp.praha.board.message.service.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageDeleteCommand {
    private String type;
    private Integer messageCnt;
    private String messageIdList;
    private int userId;
}
