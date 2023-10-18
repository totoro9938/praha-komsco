package com.cp.praha.main.common.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Setter
@Getter
@Entity
public class CallAverageDomain {
    @Id
    private String regYmd;
    private String personal;
    private String center;
}
