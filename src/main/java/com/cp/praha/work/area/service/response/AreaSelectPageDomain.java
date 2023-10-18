package com.cp.praha.work.area.service.response;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Id;


@Getter
@Setter
@ToString
@Entity
public class AreaSelectPageDomain {
    private String companyCd;
    @Id
    private int areaId;
    private String areaUuid;
    private String sidoName;
    private String sidoHanja;
    private String sidoEnglish;
    private String siName;
    private String siHanja;
    private String siEnglish;
    private String gugunName;
    private String gugunHanja;
    private String gugunEnglish;
    private String dongName;
    private String dongHanja;
    private String dongEnglish;
    private String dongHjd;
    private String dongBjd;
    private int rgtrId;
    private String regDt;
    private int mdfrId;
    private String mdfDt;
}