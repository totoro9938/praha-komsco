package com.cp.praha.work.customer.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Getter @Setter
public class CustomerIdUnitedCommand {

    @NotNull(message = "기준 고객 아이디는 필수입니다.")
    private Integer unitedCustId;
    @NotNull(message = "대상 고객 아이디는 필수입니다.")
    private List<Integer> targetCustId;
    private int mdfrId;

}
