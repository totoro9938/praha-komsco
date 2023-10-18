package com.cp.praha.board.message.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class MessageImportanceCommand {
    @NotNull(message = "쪽지 아이디는 필수입니다.")
    @Min(value = 0)
    private Integer messageId;
    private String importance;
}
