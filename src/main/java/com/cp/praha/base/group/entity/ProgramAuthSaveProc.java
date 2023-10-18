package com.cp.praha.base.group.entity;

import com.cp.praha.base.group.service.request.ProgramAuthSaveCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.group.entity.ProgramAuthSaveProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ACTOR_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ACTOR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_SELECT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_INSERT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_UPDATE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_DELETE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_PRINT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_DOWN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_RANGE_ALL", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_RANGE_SUB", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_RANGE_OWN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_AGENT_SELECT", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_01", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_02", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_03", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_04", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_05", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_06", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_07", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_08", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_09", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_10", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_11", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_12", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_13", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_14", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_GRANT_EXTEND_15", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_DESCRIPTION", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_AUTH_GROUP_UID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MDFR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_IP", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@Getter
@Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProgramAuthSaveProc {
    public static final String PROC_NAME = "USP_PROGRAM_AUTH_SAVE";

    @Id
    private Integer programId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager, ProgramAuthSaveCommand programAuthSaveCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);


        procedureQuery.setParameter("V_PROGRAM_ID", programAuthSaveCommand.getProgramId());
        procedureQuery.setParameter("V_ACTOR_TYPE", "Group");
        procedureQuery.setParameter("V_ACTOR_ID", programAuthSaveCommand.getActorId());
        procedureQuery.setParameter("V_GRANT_SELECT", programAuthSaveCommand.getGrantSelect());
        procedureQuery.setParameter("V_GRANT_INSERT", programAuthSaveCommand.getGrantInsert());
        procedureQuery.setParameter("V_GRANT_UPDATE", programAuthSaveCommand.getGrantUpdate());
        procedureQuery.setParameter("V_GRANT_DELETE", programAuthSaveCommand.getGrantDelete());
        procedureQuery.setParameter("V_GRANT_PRINT", programAuthSaveCommand.getGrantPrint());
        procedureQuery.setParameter("V_GRANT_DOWN", programAuthSaveCommand.getGrantDown());
        procedureQuery.setParameter("V_GRANT_RANGE_ALL", programAuthSaveCommand.getGrantRangeAll());
        procedureQuery.setParameter("V_GRANT_RANGE_SUB", programAuthSaveCommand.getGrantRangeSub());
        procedureQuery.setParameter("V_GRANT_RANGE_OWN", programAuthSaveCommand.getGrantRangeOwn());
        procedureQuery.setParameter("V_AGENT_SELECT", programAuthSaveCommand.getGrantAgent());
        procedureQuery.setParameter("V_GRANT_EXTEND_01", programAuthSaveCommand.getGrantExtend_01());
        procedureQuery.setParameter("V_GRANT_EXTEND_02", programAuthSaveCommand.getGrantExtend_02());
        procedureQuery.setParameter("V_GRANT_EXTEND_03", programAuthSaveCommand.getGrantExtend_03());
        procedureQuery.setParameter("V_GRANT_EXTEND_04", programAuthSaveCommand.getGrantExtend_04());
        procedureQuery.setParameter("V_GRANT_EXTEND_05", programAuthSaveCommand.getGrantExtend_05());
        procedureQuery.setParameter("V_GRANT_EXTEND_06", programAuthSaveCommand.getGrantExtend_06());
        procedureQuery.setParameter("V_GRANT_EXTEND_07", programAuthSaveCommand.getGrantExtend_07());
        procedureQuery.setParameter("V_GRANT_EXTEND_08", programAuthSaveCommand.getGrantExtend_08());
        procedureQuery.setParameter("V_GRANT_EXTEND_09", programAuthSaveCommand.getGrantExtend_09());
        procedureQuery.setParameter("V_GRANT_EXTEND_10", programAuthSaveCommand.getGrantExtend_10());
        procedureQuery.setParameter("V_GRANT_EXTEND_11", programAuthSaveCommand.getGrantExtend_11());
        procedureQuery.setParameter("V_GRANT_EXTEND_12", programAuthSaveCommand.getGrantExtend_12());
        procedureQuery.setParameter("V_GRANT_EXTEND_13", programAuthSaveCommand.getGrantExtend_13());
        procedureQuery.setParameter("V_GRANT_EXTEND_14", programAuthSaveCommand.getGrantExtend_14());
        procedureQuery.setParameter("V_GRANT_EXTEND_15", programAuthSaveCommand.getGrantExtend_15());
        procedureQuery.setParameter("V_DESCRIPTION", programAuthSaveCommand.getDescription());
        procedureQuery.setParameter("V_AUTH_GROUP_UID", programAuthSaveCommand.getAuthGroupUid());
        procedureQuery.setParameter("V_MDFR_ID", programAuthSaveCommand.getUserId());
        procedureQuery.setParameter("V_IP", programAuthSaveCommand.getIp());
        procedureQuery.execute();

        return procedureQuery;
    }
}
