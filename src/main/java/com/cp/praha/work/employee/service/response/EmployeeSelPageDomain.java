package com.cp.praha.work.employee.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
@ToString
public class EmployeeSelPageDomain {
    @Id
    private int no;
    private String userCd;
    private String userNm;
    private String deptNm1;
    private String deptNm2;
    private String deptNm3;
    private String deptCd1;
    private String deptCd2;
    private String deptCd3;
    private String positionNm;
    private String telNo;
    private String hpNo;
    private String statNm;
    private String userWork;
    private ZonedDateTime syncDt;
}
