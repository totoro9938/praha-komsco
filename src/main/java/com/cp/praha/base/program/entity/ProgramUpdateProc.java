package com.cp.praha.base.program.entity;

import com.cp.praha.base.program.service.request.ProgramUpdateCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.program.entity.ProgramUpdateProc.PROC_NAME;


@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = ProgramUpdateProc.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_IDX", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ROLE_NM", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_URL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PARAMETER", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_NAVIGATE_URL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_DEFAULT_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_WIDTH", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_HEIGHT", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_INSERT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_UPDATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_DELETE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_PRINT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_DOWN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_RANGE_ALL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_RANGE_SUB", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DEPT_RANGE_OWN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_AGENT_SELECT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_01", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_02", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_03", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_04", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_05", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_06", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_07", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_08", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_09", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_10", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_11", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_12", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_13", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_14", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_EXTEND_15", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_SYS_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MENU_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_POPUP_YN", type = String.class, mode = ParameterMode.IN
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
public class ProgramUpdateProc {
    public static final String PROC_NAME = "USP_PROGRAM_UPT";

    @Id
    private Integer programId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      ProgramUpdateCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager,PROC_NAME);
        procedureQuery.setParameter("V_PROGRAM_ID", command.getProgramId());
        procedureQuery.setParameter("V_PROGRAM_IDX", command.getProgramIdx());
        procedureQuery.setParameter("V_PROGRAM_NM", command.getProgramNm());
        procedureQuery.setParameter("V_ROLE_NM", command.getRoleNm());
        procedureQuery.setParameter("V_URL", command.getUrl());
        procedureQuery.setParameter("V_PARAMETER", command.getParameter());
        procedureQuery.setParameter("V_NAVIGATE_URL", command.getNavigateUrl());
        procedureQuery.setParameter("V_PROGRAM_DEFAULT_YN", command.getProgramDefaultYn());
        procedureQuery.setParameter("V_WIDTH", command.getWidth());
        procedureQuery.setParameter("V_HEIGHT", command.getHeight());
        procedureQuery.setParameter("V_PROGRAM_INSERT", command.getProgramInsert());
        procedureQuery.setParameter("V_PROGRAM_UPDATE", command.getProgramUpdate());
        procedureQuery.setParameter("V_PROGRAM_DELETE", command.getProgramDelete());
        procedureQuery.setParameter("V_PROGRAM_PRINT", command.getProgramPrint());
        procedureQuery.setParameter("V_PROGRAM_DOWN", command.getProgramDown());
        procedureQuery.setParameter("V_DEPT_RANGE_ALL", command.getDeptRangeAll());
        procedureQuery.setParameter("V_DEPT_RANGE_SUB", command.getDeptRangeSub());
        procedureQuery.setParameter("V_DEPT_RANGE_OWN", command.getDeptRangeOwn());
        procedureQuery.setParameter("V_AGENT_SELECT", command.getAgentSelect());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_01", command.getProgramExtend_01());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_02", command.getProgramExtend_02());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_03", command.getProgramExtend_03());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_04", command.getProgramExtend_04());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_05", command.getProgramExtend_05());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_06", command.getProgramExtend_06());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_07", command.getProgramExtend_07());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_08", command.getProgramExtend_08());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_09", command.getProgramExtend_09());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_10", command.getProgramExtend_10());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_11", command.getProgramExtend_11());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_12", command.getProgramExtend_12());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_13", command.getProgramExtend_13());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_14", command.getProgramExtend_14());
        procedureQuery.setParameter("V_PROGRAM_EXTEND_15", command.getProgramExtend_15());
        procedureQuery.setParameter("V_SYS_YN", command.getSysYn());
        procedureQuery.setParameter("V_MENU_YN", command.getMenuYn());
        procedureQuery.setParameter("V_POPUP_YN", command.getPopupYn());
        procedureQuery.setParameter("V_USE_YN", command.getUseYn());
        procedureQuery.setParameter("V_DEL_YN", command.getDelYn());
        procedureQuery.setParameter("V_DESCRIPTION", command.getDescription());
        procedureQuery.setParameter("V_RE_IDX_YN", command.getReIdxYn());
        procedureQuery.setParameter("V_MDFR_ID", command.getMdfrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
