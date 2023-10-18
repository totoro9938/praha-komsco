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
@Table(name = "tb_dept")
@Where(clause = "USE_YN = 'Y' AND DEL_YN = 'N' AND INHERIT_USE_YN = 'Y' AND INHERIT_DEL_YN = 'N'")
public class DeptEntity implements Serializable {
    static final long serialVersionUID = 100;
    @Id
    @Column(name = "DEPT_ID")
    private int deptId;
    @Column(name = "DEPT_UUID")
    private String deptUuid;
    @Column(name = "DEPT_CD")
    private String deptCd;
    @Column(name = "TOP_DEPT_ID")
    private String topDeptId;
    @Column(name = "DEPT_IDX")
    private Integer deptIdx;
    @Column(name = "DEPT_PATH")
    private String deptPath;
    @Column(name = "SORT_PATH")
    private String sortPath;
    @Column(name = "DEPT_NM")
    private String deptNm;
    @Column(name = "dept_lvl")
    private int deptLvl;
    @Column(name = "full_dept_nm")
    private String fullDeptNm;
    @Column(name = "PARENT_ID")
    private int parentId;
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
    @Where(clause = "DEL_YN = 'N' AND USE_YN = 'Y'")
    @OrderBy("deptIdx ASC")
    private List<DeptEntity> items = new ArrayList<>();
}
