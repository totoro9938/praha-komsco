package com.cp.praha.base.group.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter @Setter
@ToString @Entity
public class GroupSelDomain {

    private String no;
    private String companyCd;
    @Id
    private String groupUid;
    private String groupUuid;
    private String parentId;
    private String parentNm;
    private String groupLvl;
    private String groupIdx;
    private String groupPath;
    private String sortPath;
    private String groupNm;
    private String sysYn;
    private String adminYn;
    private String useYn;
    private String description;

}
