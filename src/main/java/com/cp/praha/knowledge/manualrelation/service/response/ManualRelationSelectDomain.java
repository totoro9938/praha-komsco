package com.cp.praha.knowledge.manualrelation.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter @Setter
@ToString @Entity
public class ManualRelationSelectDomain {

    @Id
    private Integer manualId;
    private String manualUuid;
    private String title;
}
