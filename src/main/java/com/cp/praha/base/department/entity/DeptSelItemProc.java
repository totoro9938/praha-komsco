package com.cp.praha.base.department.entity;

import com.cp.praha.common.util.ProcErrorHandler;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.*;

import javax.persistence.*;


@NamedStoredProcedureQuery(
        name = DeptSelItemProc.PROC_NAME,
        procedureName = DeptSelItemProc.PROC_NAME,
        resultClasses = DeptSelItemProc.class,
        parameters = {
                @StoredProcedureParameter(name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "V_DEPT_UUID", type = String.class, mode = ParameterMode.IN),
                @StoredProcedureParameter(name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT),
                @StoredProcedureParameter(name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT)
        }
)
@Getter
@Setter
@ToString
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DeptSelItemProc {

    public static final String PROC_NAME = "USP_DEPT_SEL_ITEM";

    private String companyCd;
    private int deptId;
    @Id
    private String deptUuid;
    private String deptCd;
    private int topDeptId;
    private int parentId;
    private int deptLvl;
    private int deptIdx;
    private String deptPath;
    private String sortPath;
    private String deptNm;
    private String fullDeptNm;
    private String telNo;
    private String faxNo;
    private String homepageUrl;
    private String deptMap;
    private String facilityInfo;
    private String deptAddr;
    private String deptType;
    private String deptTypeNm;
    private String transferType;
    private String transferTypeNm;
    private String actionDeptCd;
    private String tactionDeptNm;
    private String deptPlace;
    private String sectionLocation;
    private String teamLocation;
    @Column(name = "DEPT_VALUE_01")
    private String deptValue01;
    @Column(name = "DEPT_VALUE_02")
    private String deptValue02;
    @Column(name = "DEPT_VALUE_03")
    private String deptValue03;
    @Column(name = "DEPT_VALUE_04")
    private String deptValue04;
    @Column(name = "DEPT_VALUE_05")
    private String deptValue05;
    @Column(name = "DEPT_VALUE_06")
    private String deptValue06;
    @Column(name = "DEPT_VALUE_07")
    private String deptValue07;
    @Column(name = "DEPT_VALUE_08")
    private String deptValue08;
    @Column(name = "DEPT_VALUE_09")
    private String deptValue09;
    @Column(name = "DEPT_VALUE_10")
    private String deptValue10;
    private String validationYn;
    private String sysYn;
    private String inheritSysYn;
    private String useYn;
    private String inheritUseYn;
    private String delYn;
    private String inheritDelYn;
    private String description;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, String deptUuid) {

        StoredProcedureQuery query = ProcedureQuery.get(entityManager, PROC_NAME);

        query.setParameter("V_DEPT_UUID", deptUuid);
        query.execute();

        ProcErrorHandler.errorHandler(query);

        return query;
    }
}