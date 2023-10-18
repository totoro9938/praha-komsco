package com.cp.praha.board.message.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class MessageDeptUserSelectDomain {
    @Id
    private Integer userId;
    private String userNm;
    private Integer deptId;
    private Integer topDeptId;
    private Integer parentId;
    private Integer deptLvl;
    private String deptNm;
    private String fullDeptNm;
    private String deptPath;
    private String sortPath;
}
