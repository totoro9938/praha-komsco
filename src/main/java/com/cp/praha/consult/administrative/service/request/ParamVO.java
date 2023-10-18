package com.cp.praha.consult.administrative.service.request;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class ParamVO {
    private String param0;
    private String param1;
    private String param2;
    private String param3;
    private String param4;
    /**
     * 파라미터에 값이 없어도 호출하는 url에 따라 &param을 붙이는 경우를 구분하기 위함
     * 0 상하수도 수용가, 1 상하수도 상세, 2 지방세 미납, 3 지방세 납부
     * 4 세외수입 미납, 5 세외수입 납부, 6 환경개선 미납, 7 환경개선 납부
     * 8 주정차 미납, 9 주정차 납부
     */
    @NotNull(message = "인덱스는 필수입니다.")
    @Min(value = 0)
    private Integer requiredUrlIndex;
}
