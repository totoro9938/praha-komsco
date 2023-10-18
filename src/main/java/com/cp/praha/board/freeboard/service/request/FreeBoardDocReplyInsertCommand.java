package com.cp.praha.board.freeboard.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class FreeBoardDocReplyInsertCommand {
    @NotNull(message = "상위아이디는 필수입니다.")
    @Min(value = 0)
    private Integer parentId;
    private String contents;
    private int rgtrId;
}
