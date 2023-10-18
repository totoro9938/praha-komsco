package com.cp.praha.board.message.service.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MessageGroupDeleteCommand {
    private List<Integer> messageGroupIds;
}
