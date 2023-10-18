package com.cp.praha.base.group.entity;

import com.cp.praha.base.group.service.request.ProgramAuthSelectCommand;
import com.cp.praha.base.group.service.response.ProgramAuthSelDomain;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.group.entity.ProgramAuthSelProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        resultClasses = ProgramAuthSelDomain.class,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ACTOR_TYPE", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_ACTOR_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_AUTH_GROUP_UID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_PROGRAM_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USE_YN", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_USER_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_CD", type = String.class, mode = ParameterMode.OUT
                ),
                @StoredProcedureParameter(
                        name = "O_ERR_MSG", type = String.class, mode = ParameterMode.OUT
                )
        }
)

@Getter @Entity
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProgramAuthSelProc {
    public static final String PROC_NAME = "USP_PROGRAM_AUTH_SEL";

    @Id
    private Integer programId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,ProgramAuthSelectCommand programAuthSelCommand) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);

        procedureQuery.setParameter("V_ACTOR_TYPE", programAuthSelCommand.getActorType());
        procedureQuery.setParameter("V_ACTOR_ID", programAuthSelCommand.getActorId());
        procedureQuery.setParameter("V_AUTH_GROUP_UID", programAuthSelCommand.getAuthGroupUid());
        procedureQuery.setParameter("V_PROGRAM_ID", programAuthSelCommand.getProgramId());
        procedureQuery.setParameter("V_USE_YN", programAuthSelCommand.getUseYn());
        procedureQuery.setParameter("V_USER_ID", programAuthSelCommand.getUserId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
