package com.cp.praha.base.group.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter @Setter
@ToString @Entity
public class GroupSelItemDomain {

    private String companyCd;
    @Id
    private Integer groupUid;
    private String groupUuid;
    private Integer parentId;
    private String groupLvl;
    private Integer groupIdx;
    private String groupPath;
    private String sortPath;
    private String groupNm;
    private String adminYn;
    private String sysYn;
    private String useYn;
    private String description;

}
