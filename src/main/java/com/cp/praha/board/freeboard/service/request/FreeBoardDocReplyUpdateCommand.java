package com.cp.praha.board.freeboard.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class FreeBoardDocReplyUpdateCommand {
    @NotNull(message = "댓글아이디는 필수입니다.")
    @Min(value = 0)
    private Integer docId;
    private String contents;
    private int mdfrId;
}
