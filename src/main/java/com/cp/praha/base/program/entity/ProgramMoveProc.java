package com.cp.praha.base.program.entity;

import com.cp.praha.base.program.service.request.ProgramMoveCommand;
import com.cp.praha.common.util.ProcedureQuery;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

import static com.cp.praha.base.program.entity.ProgramMoveProc.PROC_NAME;

@NamedStoredProcedureQuery(
        name = PROC_NAME,
        procedureName = PROC_NAME,
        parameters = {
                @StoredProcedureParameter(
                        name = "V_COMPANY_CD", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_OBJECT_PROGRAM_ID", type = String.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_TARGET_PROGRAM_ID", type = Integer.class, mode = ParameterMode.IN
                ),
                @StoredProcedureParameter(
                        name = "V_MOVE_TYPE", type = Integer.class, mode = ParameterMode.IN
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
public class ProgramMoveProc {
    public static final String PROC_NAME = "USP_PROGRAM_MOV";

    @Id
    private String programId;

    public static StoredProcedureQuery procedureQuery(EntityManager entityManager,
                                                      ProgramMoveCommand command) {
        var procedureQuery = ProcedureQuery.get(entityManager, PROC_NAME);
        procedureQuery.setParameter("V_OBJECT_PROGRAM_ID", command.getObjectProgramId());
        procedureQuery.setParameter("V_TARGET_PROGRAM_ID",Integer.parseInt(command.getTargetProgramId()));
        procedureQuery.setParameter("V_MOVE_TYPE",0);
        procedureQuery.setParameter("V_MDFR_ID",command.getMdfrId());
        procedureQuery.execute();

        return procedureQuery;
    }
}
