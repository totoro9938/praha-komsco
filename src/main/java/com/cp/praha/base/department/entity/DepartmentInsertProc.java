package com.cp.praha.base.department.entity;

import com.cp.praha.base.department.service.request.DepartmentInsertCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.department.entity.DepartmentInsertProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_UUID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TEL_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_FAX_NO", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_VALUE_01", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_VALUE_02", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_VALUE_03", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_VALUE_04", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_VALUE_05", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_VALUE_06", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_VALUE_07", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_VALUE_08", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_VALUE_09", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_VALUE_10", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYS_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEL_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RE_IDX_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_ID", type = Integer.class, mode = ParameterMode.OUT
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
public class DepartmentInsertProc {
    public static final String PROC_NAME = "USP_DEPT_INS";

    @Id
    private String deptId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, DepartmentInsertCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_DEPT_CD", command.getDeptCd());
        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_DEPT_UUID", command.getDeptUuid());
        procedureQuery.setParameter("V_DEPT_IDX", command.getDeptIdx());
        procedureQuery.setParameter("V_DEPT_NM", command.getDeptNm());
        procedureQuery.setParameter("V_TEL_NO", command.getTelNo());
        procedureQuery.setParameter("V_FAX_NO", command.getFaxNo());
        procedureQuery.setParameter("V_DEPT_VALUE_01", command.getDeptValue_01());
        procedureQuery.setParameter("V_DEPT_VALUE_02", command.getDeptValue_02());
        procedureQuery.setParameter("V_DEPT_VALUE_03", command.getDeptValue_03());
        procedureQuery.setParameter("V_DEPT_VALUE_04", command.getDeptValue_04());
        procedureQuery.setParameter("V_DEPT_VALUE_05", command.getDeptValue_05());
        procedureQuery.setParameter("V_DEPT_VALUE_06", command.getDeptValue_06());
        procedureQuery.setParameter("V_DEPT_VALUE_07", command.getDeptValue_07());
        procedureQuery.setParameter("V_DEPT_VALUE_08", command.getDeptValue_08());
        procedureQuery.setParameter("V_DEPT_VALUE_09", command.getDeptValue_09());
        procedureQuery.setParameter("V_DEPT_VALUE_10", command.getDeptValue_10());
        procedureQuery.setParameter("V_SYS_YN", command.getSysYn());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_DEL_YN", command.getDelYn());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_RE_IDX_YN", command.getReIdxYn());
        procedureQuery.setParameter("V_RGTR_ID", command.getRgtrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
