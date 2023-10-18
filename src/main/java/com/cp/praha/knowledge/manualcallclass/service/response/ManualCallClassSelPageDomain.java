package com.cp.praha.knowledge.manualcallclass.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@ToString
@Entity
public class ManualCallClassSelPageDomain {
    @Id
    private int catId;
    private String catUuid;
    private String catNm;
    private String callCatNm;
    private String deptTypeNm;
    private String questionTypeNm;
}