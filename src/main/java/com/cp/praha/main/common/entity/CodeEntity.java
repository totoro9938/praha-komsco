package com.cp.praha.main.common.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "tb_code")
@Where(clause = "USE_YN = 'Y' AND DEL_YN = 'N' AND INHERIT_USE_YN = 'Y' AND INHERIT_DEL_YN = 'N'")
public class CodeEntity implements Serializable {

    @Id
    private int codeId;
    private String companyCd;
    private String codeUuid;
    private String codeGroupCd;
    @Column(name="PARENT_ID")
    private int  parentId;
    private int codeLvl;
    private Integer codeIdx;
    private String codePath;
    private String sortPath;
    private String keyPath;
    private String codeNm;
    private String fullCodeNm;
    private String codeKey;
    private String codeValue_01;
    private String codeValue_02;
    private String codeValue_03;
    private String codeValue_04;
    private String codeValue_05;
    @Column(name = "USE_YN")
    private String useYn;
    @Column(name = "INHERIT_USE_YN")
    private String inheritUseYn;
    @Column(name = "DEL_YN")
    private String delYn;
    @Column(name = "INHERIT_DEL_YN")
    private String inheritDelYn;

    @OneToMany(fetch = FetchType.EAGER)
    @JoinColumn(name = "PARENT_ID")
    @OrderBy("codeIdx asc")
    private List<CodeEntity> items = new ArrayList<>();
}
