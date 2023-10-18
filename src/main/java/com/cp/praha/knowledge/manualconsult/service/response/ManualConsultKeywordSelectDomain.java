package com.cp.praha.knowledge.manualconsult.service.response;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Setter
@Entity
public class ManualConsultKeywordSelectDomain {
    @Id
    private String searchKeyword;
    private Integer searchCnt;
}
