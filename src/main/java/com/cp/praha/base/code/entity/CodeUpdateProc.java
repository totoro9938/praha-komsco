package com.cp.praha.base.code.entity;

import com.cp.praha.base.code.service.request.CodeUpdateCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.code.entity.CodeUpdateProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_GROUP_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARENT_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_KEY", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_VALUE_01", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_VALUE_02", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_VALUE_03", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_VALUE_04", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_VALUE_05", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYS_YN", type = String.class, mode = ParameterMode.IN
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
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class CodeUpdateProc {
    public static final String PROC_NAME = "USP_CODE_UPT";

    @Id
    private String codeId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,CodeUpdateCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);

        procedureQuery.setParameter("V_CODE_ID", command.getCodeId());
        procedureQuery.setParameter("V_CODE_GROUP_CD", command.getCodeGroupCd());
        procedureQuery.setParameter("V_PARENT_ID", command.getParentId());
        procedureQuery.setParameter("V_CODE_IDX", command.getCodeIdx());
        procedureQuery.setParameter("V_CODE_NM", command.getCodeNm());
        procedureQuery.setParameter("V_CODE_KEY", command.getCodeKey());
        procedureQuery.setParameter("V_CODE_VALUE_01", command.getCodeValue_01());
        procedureQuery.setParameter("V_CODE_VALUE_02", command.getCodeValue_02());
        procedureQuery.setParameter("V_CODE_VALUE_03", command.getCodeValue_03());
        procedureQuery.setParameter("V_CODE_VALUE_04", command.getCodeValue_04());
        procedureQuery.setParameter("V_CODE_VALUE_05", command.getCodeValue_05());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_SYS_YN", command.getSysYn());
        procedureQuery.setParameter("V_DEL_YN", command.getDelYn());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_RE_IDX_YN", command.getReIdxYn());
        procedureQuery.setParameter("V_MDFR_ID", command.getMdfrId());

        return procedureQuery;
    }
}
