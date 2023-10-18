package com.cp.praha.base.user.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.time.ZonedDateTime;

@Getter @Setter
@ToString @Entity
public class UserSelectPageDomain {

    private Integer no;
    private String companyCd;
    @Id
    private Integer userId;
    private String userUuid;
    private String userCd;
    private Integer userIdx;
    private String duty;
    private Integer deptId;
    private String deptNm;
    private String fullDeptNm;
    private String enterYmd;
    private String retireYmd;
    private String telNo;
    private String hpNo;
    private String useYn;
    private String useYnNm;
    private String ctiYn;
    private String ctiId;
    private String ctiStation;
    private String userNm;
    private String email;
    private String delYn;
    private Integer groupUid;
    private String groupNm;
    private String description;
    private String positionNm;
    private ZonedDateTime lastLoginDt;
    private Integer rgtrId;
    private String rgtrNm;
    private ZonedDateTime regDt;
    private Integer mdfrId;
    private String mdfrNm;
    private ZonedDateTime mdfDt;
}
