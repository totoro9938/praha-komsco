package com.cp.praha.base.code.entity;

import com.cp.praha.base.code.service.request.CodeGroupInsertCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.code.entity.CodeGroupInsertProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_GROUP_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_GROUP_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_GROUP_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_NM_TITLE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_KEY_TITLE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_VALUE_01_TITLE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_VALUE_02_TITLE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_VALUE_03_TITLE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_VALUE_04_TITLE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_CODE_VALUE_05_TITLE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MAX_ALLOW_LVL", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MEMORY_MAN_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYS_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_RGTR_ID", type = Integer.class, mode = ParameterMode.IN
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
public class CodeGroupInsertProc {
    public static final String PROC_NAME = "USP_CODE_GROUP_INS";

    @Id
    private String codeGroupCd;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,CodeGroupInsertCommand command) {

        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_CODE_GROUP_CD", command.getCodeGroupCd());
        procedureQuery.setParameter("V_CODE_GROUP_NM", command.getCodeGroupNm());
        procedureQuery.setParameter("V_CODE_GROUP_IDX", command.getCodeGroupIdx());
        procedureQuery.setParameter("V_CODE_NM_TITLE", command.getCodeNmTitle());
        procedureQuery.setParameter("V_CODE_KEY_TITLE", command.getCodeKeyTitle());
        procedureQuery.setParameter("V_CODE_VALUE_01_TITLE", command.getCodeValueTitle_01());
        procedureQuery.setParameter("V_CODE_VALUE_02_TITLE", command.getCodeValueTitle_02());
        procedureQuery.setParameter("V_CODE_VALUE_03_TITLE", command.getCodeValueTitle_03());
        procedureQuery.setParameter("V_CODE_VALUE_04_TITLE", command.getCodeValueTitle_04());
        procedureQuery.setParameter("V_CODE_VALUE_05_TITLE", command.getCodeValueTitle_05());
        procedureQuery.setParameter("V_MAX_ALLOW_LVL", command.getMaxAllowLvl());
        procedureQuery.setParameter("V_MEMORY_MAN_YN", command.getMemoryManYn());
        procedureQuery.setParameter("V_SYS_YN", command.getSysYn());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_RGTR_ID", command.getRgtrId());

        return procedureQuery;
    }
}
