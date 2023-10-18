package com.cp.praha.main.common.entity;

import com.cp.praha.main.common.service.response.DeptDomain;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NamedStoredProcedureQuery(
        name = DeptSelNameProc.USP_DEPT_SEL_NAME,
        procedureName = "USP_DEPT_SEL_ALL",
        resultClasses = DeptDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_NM", type = String.class, mode = ParameterMode.IN
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
public class DeptSelNameProc {

    public static final String USP_DEPT_SEL_NAME = "USP_DEPT_SEL_NAME";
    @Id
    private String deptId;
}
