package com.cp.praha.board.message.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class MessageDeptUserSelectCommand {
    @NotNull(message = "부서아이디는 필수입니다.")
    @Min(value = 0)
    private Integer parentId;
    @NotNull(message = "부서아이디는 필수입니다.")
    @Min(value = 0)
    private Integer deptId;
    private String useYn;
    private String delYn;
    private String outputYn;
    private String sortType;
}
