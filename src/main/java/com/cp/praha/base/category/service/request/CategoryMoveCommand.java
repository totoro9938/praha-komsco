package com.cp.praha.base.category.service.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ToString
public class CategoryMoveCommand {
    @NotBlank(message = "이동할 상담분류가 비어있습니다.")
    private String  objectCatId;
    @NotBlank(message = "이동될 상담분류가 비어있습니다.")
    private String  targetCatId;
    private int mdfrId;
}
