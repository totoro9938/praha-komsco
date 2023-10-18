package com.cp.praha.base.user.service.response;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class UserSelectItemDomain {

    private String companyCd;
    @Id
    private Integer userId;
    private String userUuid;
    private String duty;
    private Integer deptId;
    private String fullDeptNm;
    private String deptNm;
    private String enterYmd;
    private String retireYmd;
    private String ctiYn;
    private String ctiId;
    private String ctiStation;
    private String ctiPwd;
    private String telNo;
    private String hpNo;
    private String useYn;
    private String useYnNm;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private Integer mdfrId;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
    private String userCd;
    private String userPwd;
    private String userNm;
    private String email;
    private String sysYn;
    private String loginYn;
    private String delYn;
    private Integer groupUid;
    private String description;
    private String positionNm;
    private Integer userIdx;
    private ZonedDateTime lastLoginDt;
}
