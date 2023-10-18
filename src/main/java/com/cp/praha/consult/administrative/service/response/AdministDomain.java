package com.cp.praha.consult.administrative.service.response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AdministDomain {
    private List<?> rows;
    private String resultCode; //상태코드 200 : 정상, 9000 : 행망서버 문제, 9100 : time out
}
