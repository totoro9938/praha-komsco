package com.cp.praha.board.message.service.response;

import com.cp.praha.board.message.service.response.responsekey.MessageGroupMemberSelectKey;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;

@Getter
@Setter
@Entity
@IdClass(MessageGroupMemberSelectKey.class)
public class MessageGroupMemberSelectDomain {
    @Id
    private Integer userId;
    private String userNm;
    @Id
    private Integer messageGroupId;
    private Integer messageGroupMemberId;
    private Integer deptId;
    private Integer topDeptId;
    private Integer parentId;
    private Integer deptLvl;
    private String deptNm;
    private String fullDeptNm;
    private String deptPath;
    private String sortPath;
}
