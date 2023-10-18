package com.cp.praha.work.smsconfig.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class UserAppointSelectDomain {
    @Id
    private int userId;
    private String userNm;
    private String fullDeptNm;
    private String deptNm;
    private String smscallYn;
}
