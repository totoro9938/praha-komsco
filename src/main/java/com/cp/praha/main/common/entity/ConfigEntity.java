package com.cp.praha.main.common.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.time.ZonedDateTime;

@Getter
@Setter
@Entity
@Table(name = "tb_config")
@Where(clause = "USE_YN = 'Y' AND DEL_YN = 'N' AND INHERIT_USE_YN = 'Y' AND INHERIT_DEL_YN = 'N'")
public class ConfigEntity implements Serializable {

    private String companyCd;
    @Id
    private int    configId;
    private String configUuid;
    private int    parentId;
    private int    configLvl;
    private int    configIdx;
    private String configKey;
    private String configNm;
    private String configValue;
    private String configPath;
    private String sortPath;
    private String keyPath;
    private String sysYn;
    private String inheritSysYn;
    @Column(name = "USE_YN")
    private String useYn;
    @Column(name = "INHERIT_USE_YN")
    private String inheritUseYn;
    @Column(name = "DEL_YN")
    private String delYn;
    @Column(name = "INHERIT_DEL_YN")
    private String inheritDelYn;
    private String description;
    private int    rgtrId;
    private ZonedDateTime regDt;
    private String regYmd;
    private int    mdfrId;
    private ZonedDateTime mdfDt;
    private String mdfYmd;
}
