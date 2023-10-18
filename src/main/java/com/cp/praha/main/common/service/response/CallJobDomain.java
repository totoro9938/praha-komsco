package com.cp.praha.main.common.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Setter
@Getter
@Entity
public class CallJobDomain {
    private String callType;
    private String callTypeNm;
    @Id
    private int code_idx;
    private int cnt;
    private int nonProcessCnt;
}
