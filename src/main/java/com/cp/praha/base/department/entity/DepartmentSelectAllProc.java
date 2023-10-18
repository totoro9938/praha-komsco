package com.cp.praha.base.department.entity;

import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.department.entity.DepartmentSelectAllProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = DepartmentSelectAllProc.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@ToString
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class DepartmentSelectAllProc {
    public static final String PROC_NAME = "USP_DEPT_SEL_ALL";

    private String companyCd;
    @Id
    private String deptId;
    private String deptUuid;
    private String deptCd;
    private String topDeptId;
    private String parentId;
    private String deptIdx;
    private String deptPath;
    private String sortPath;
    private String deptNm;
    private String fullDeptNm;
    private String telNo;
    private String faxNo;
    private String deptValue_01;
    private String deptValue_02;
    private String deptValue_03;
    private String deptValue_04;
    private String deptValue_05;
    private String deptValue_06;
    private String deptValue_07;
    private String deptValue_08;
    private String deptValue_09;
    private String deptValue_10;
    private String validationYn;
    private String sysYn;
    private String inheritUseYn;
    private String delYn;
    private String inheritDelYn;
    private String description;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.execute();

        return procedureQuery;
    }
}
