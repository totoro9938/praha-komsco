package com.cp.praha.consult.consultmain.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class ReservationAgentSelectDomain {
    private String companyCd;
    @Id
    private Integer userId;
    private Integer deptId;
    private String  FullDeptNm;
    private String  userCd;
    private String  userNm;

}
