package com.cp.praha.board.message.service.request;

import com.cp.praha.main.common.service.response.FileInfoDomain;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Setter
public class MessageInsertCommand {
    private Integer parentId;
    @NotBlank(message = "쪽지 내용은 필수입니다.")
    private String contents;
    @NotNull(message = "쪽지 대상은 필수입니다.")
    @Min(value = 0)
    private Integer receiverCnt;
    @NotBlank(message = "쪽지 대상은 필수입니다.")
    private String messageReceiverIdList;
    @NotBlank(message = "쪽지 대상은 필수입니다.")
    private String messageReceiverNmList;
    private String description;
    private List<FileInfoDomain> files;
    private int rgtrId;
}
