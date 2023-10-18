package com.cp.praha.board.notice.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class NoticeDocSelectItemCommand {
    @NotBlank(message = "uuid는 필수입니다.")
    private String docUuid;
    @NotNull(message = "userId는 필수입니다.")
    @Min(value = 0)
    private Integer loginUserId;
}
