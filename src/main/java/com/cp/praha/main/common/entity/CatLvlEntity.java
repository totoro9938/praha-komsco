package com.cp.praha.main.common.entity;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

import javax.persistence.*;

@Setter
@Getter
@Entity
@Table(name = "tb_cat")
@Where(clause = "USE_YN = 'Y' AND DEL_YN = 'N' AND INHERIT_USE_YN = 'Y' AND INHERIT_DEL_YN = 'N'")
public class CatLvlEntity {
    @OrderBy("catIdx asc")
    @Id
    @Column(name = "CAT_ID", nullable = false)
    private Long catId;

    @Column(name = "CAT_UUID", nullable = false, length = 100)
    private String catUuid;

    @Column(name = "CAT_GROUP_CD", nullable = false, length = 30)
    private String catGroupCd;

    @Column(name = "PARENT_ID", nullable = false)
    private Integer parentId;

    @Column(name = "CAT_LVL", nullable = false)
    private Integer catLvl;

    @Column(name = "CAT_IDX", nullable = false)
    private Integer catIdx;

    @Column(name = "CAT_PATH", nullable = false, length = 100)
    private String catPath;

    @Column(name = "SORT_PATH", nullable = false, length = 100)
    private String sortPath;

    @Column(name = "CAT_NM", nullable = false, length = 100)
    private String catNm;

    @Column(name = "FULL_CAT_NM", length = 1000)
    private String fullCatNm;

    @Column(name = "CAT_VALUE", length = 50)
    private String catValue;

    @Column(name = "VALUE_PATH", length = 2000)
    private String valuePath;

    @Column(name = "CAT_VALUE_01", length = 500)
    private String catValue_01;

    @Column(name = "CAT_VALUE_02", length = 500)
    private String catValue_02;

    @Column(name = "CAT_VALUE_03", length = 500)
    private String catValue_03;

    @Column(name = "CAT_VALUE_04", length = 500)
    private String catValue_04;

    @Column(name = "CAT_VALUE_05", length = 500)
    private String catValue_05;

    @Column(name = "DESCRIPTION", length = 4000)
    private String description;

    @Column(name = "USE_YN")
    private String useYn;

    @Column(name = "INHERIT_USE_YN")
    private String inheritUseYn;

    @Column(name = "DEL_YN")
    private String delYn;

    @Column(name = "INHERIT_DEL_YN")
    private String inheritDelYn;
}
