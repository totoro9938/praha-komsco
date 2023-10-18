package com.cp.praha.consult.consultmain.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter
@Setter
@ToString
@Entity
public class UserFindPageDomain {
    private String companyCd;
    @Id
    private int    userId;
    private String userUuid;
    private String userCd;
    private int    userIdx;
    private String duty;
    private int    deptId;
    private String deptNm;
    private String fullDeptNm;
    private String enterYmd;
    private String retireYmd;
    private String telNo;
    private String hpNo;
    private Character useYn;
    private String useYnNm;
    private Character ctiYn;
    private String ctiId;
    private String ctiStation;
    private String userNm;
    private String email;
    private Character delYn;
    private int    groupUid;
    private String groupNm;
    private String description;
    private String positionNm;
    private ZonedDateTime lastLoginDt;
}
